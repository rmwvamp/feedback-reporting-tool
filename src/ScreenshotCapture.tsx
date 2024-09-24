import React, { useState, useEffect, useRef, useCallback,useContext, forwardRef } from 'react';
import html2canvas from 'html2canvas'; // Import html2canvas
import { fabric } from 'fabric';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Fab, Tooltip, TextField, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit'; // Import the edit (draw) icon

interface ScreenshotCaptureProps {
  canvasElement: HTMLCanvasElement | null; // New prop for the canvas element

  onSave: (dataUrl: string) => void;
  onClose: () => void;
}


const ScreenshotCapture: React.FC<ScreenshotCaptureProps> = ({
  canvasElement,
  onSave,
  onClose,
}) => {
  

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [commentText, setCommentText] = useState('');
  const [commentPosition, setCommentPosition] = useState<{ x: number; y: number } | null>(null);
  const [commentCount, setCommentCount] = useState(1); // State to keep track of the comment count
  const [isAddingComment, setIsAddingComment] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false); // State to manage drawing mode


  useEffect(() => {
    // Set the default mode for canvas as not drawing
    if (canvas) {
      canvas.isDrawingMode = isDrawing;
    }
  }, [canvas, isDrawing]);


  useEffect(() => {
    if (canvasElement && canvasRef.current) {
      // Ensure the canvas element is rendered in the DOM
      const dataUrl = canvasElement.toDataURL();
      if (canvas) {
        fabric.Image.fromURL(dataUrl, (img:any) => {
          canvas.clear();
          img.scaleToWidth(canvas.width || window.innerWidth);
          img.scaleToHeight(canvas.height || window.innerHeight);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvasElement, 0, 0);
      }
      
      // Initialize fabric.js canvas with the captured screenshot
      if (!canvas) {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
          isDrawingMode: true,
        });
        
        setCanvas(newCanvas);
      }
    }
  }, [canvasElement, canvas]);



  const handleAddComment = useCallback(() => {
    if (canvas && commentPosition && commentText) {
      // Create a circle for the badge
      const circle = new fabric.Circle({
        radius: 12,
        fill: '#4dabf5',
        originX: 'center',
        originY: 'center',
      });
  
      // Create a text for the badge number
      const numberText = new fabric.Text(commentCount.toString(), {
        fontSize: 18,
        originX: 'center',
        originY: 'center',
        fill: '#fff',
      });
  
      // Create a group for the badge
      const badge = new fabric.Group([circle, numberText], {
        left: commentPosition.x,
        top: commentPosition.y - 20,
        selectable: false,
      });
  
      // Create a textbox for the comment text with multiline support and increased height
      const text = new fabric.Textbox(commentText, {
        left: commentPosition.x,
        top: commentPosition.y + 10, // Adjust the position to increase gap
        fontSize: 18,
        fill: '#000',
        backgroundColor: 'white',
        borderColor: 'gray',
        editingBorderColor: 'blue',
        hasControls: true,
        width: 250,
        height: 150, // Increased height for multiline support
        minWidth: 200,
        minHeight: 100,
      });
      const deleteIconStyle = {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#f44336', // Red color for the delete button
        padding: '2px 4px',
        borderRadius: '50%', // Circular shape
        cursor: 'pointer',
        textAlign: 'center',
        lineHeight: '14px',
        width: 14,
        height: 14,
        userSelect: 'none', // Prevent text selection
      };
  
      // Group badge and text together
      const group = new fabric.Group([badge, text], {
        selectable: true,
      });
  
      canvas.add(group).renderAll();
  
      // Add a delete icon/button on the group
      group.on('selected', function () {
        // Add a delete button to the group object
        // You can use fabric.js methods to add a delete icon and handle its click event
        // This is an example, you may need to adjust styles and positions
        const deleteIcon = new fabric.IText('X', {
          fontSize: 14,
          left: group.left + group.width / 2,
          top: group.top - 10,
          originX: 'center',
          originY: 'center',
          fill: '#ff0000',
          selectable: false,
        });
        canvas.add(deleteIcon);
        canvas.renderAll();
  
        // Attach a click event to the delete icon
        deleteIcon.on('mousedown', function () {
          canvas.remove(group);
          canvas.remove(deleteIcon);
          canvas.discardActiveObject(); // Deselect the group
          canvas.renderAll();
        });
      });
  
      // Increment comment count
      setCommentCount(prevCount => prevCount + 1);
      // Reset states
      setCommentText('');
      setCommentPosition(null);
      setIsAddingComment(true); // Keep the comment mode active
    }
  }, [canvas, commentPosition, commentText, commentCount]);
  
  
  


  const handleAddCommentMode = useCallback(() => {
    setIsAddingComment(true); // Enable comment-adding mode
  }, []);


  const handleCanvasClick = useCallback((options: fabric.IEvent) => {
    const pointer = canvas?.getPointer(options.e);
    if (pointer && isAddingComment) {
      setCommentPosition({ x: pointer.x, y: pointer.y }); // Save the click position
    }
  }, [canvas, isAddingComment]);

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:down', handleCanvasClick);
    }

    return () => {
      if (canvas) {
        canvas.off('mouse:down', handleCanvasClick);
      }
    };
  }, [canvas, handleCanvasClick]);

  

  
  
  

  const handleSave = useCallback(() => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: window.devicePixelRatio, // Adjust for device pixel ratio
      });
      onSave(dataUrl);
    }
  }, [canvas, onSave]);

  const toggleDrawingMode = useCallback(() => {
    const newIsDrawing = !isDrawing;
    setIsDrawing(newIsDrawing); 
    setIsAddingComment(!newIsDrawing); // Turn off commenting if we're now drawing
  }, [isDrawing]);


  const toggleMode = useCallback((mode: 'comment' | 'draw') => {
    const isCommenting = mode === 'comment';
    setIsAddingComment(isCommenting);
    setIsDrawing(!isCommenting);
    if (canvas) {
      canvas.isDrawingMode = !isCommenting;
    }
  }, [canvas]);

  

  return (
    <Box 
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
   {}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <Box
  sx={{
    position: 'absolute',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: '0.5rem',
    background: '#4dabf5',
    borderRadius: '6px',
  }}
>
  <Tooltip title="Save Screenshot" aria-label="save">
    <IconButton onClick={handleSave} sx={{ color: 'white' }}>
      <SaveIcon />
    </IconButton>
  </Tooltip>

  <Tooltip title="Toggle Commenting Mode" aria-label="toggle-comment">
          <IconButton onClick={() => toggleMode('comment')} sx={{ color: isAddingComment ? 'black' : 'white' }}>
            <CommentIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Drawing Mode" aria-label="toggle-draw">
          <IconButton onClick={() => toggleMode('draw')} sx={{ color: isDrawing ? 'black' : 'white' }}>
            <EditIcon />
          </IconButton>
        </Tooltip>



  <Tooltip title="Close" aria-label="close">
    <IconButton onClick={onClose} sx={{ color: 'white' }}>
      <CloseIcon />
    </IconButton>
  </Tooltip>
</Box>


{isAddingComment && commentPosition && (
        <Box
        sx={{
          position: 'absolute',
          top: `${commentPosition.y}px`,
          left: `${commentPosition.x}px`,
          zIndex: 1400,
          background: 'white',
          padding: '8px',
          borderRadius: '4px',
        }}
        className='hide-for-screenshot'
      >

<TextField
  multiline // Enable multiline
  rows={4}  // Start with four rows
  size="small"
  label="Comment"
  value={commentText}
  onChange={(e) => setCommentText(e.target.value)}
  autoFocus
  variant="outlined"
  sx={{
    width: '200px',
    '& .MuiOutlinedInput-root': {
      minHeight: '100px', // Adjust height for the input field
    },
  }}
/>

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginLeft: 1 }}
            onClick={handleAddComment}
          >
            Add
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ScreenshotCapture;

