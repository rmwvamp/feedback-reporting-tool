import React, { useCallback, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { fabric } from 'fabric';
import Button from '@mui/material/Button';

interface ScreenshotEditorProps {
  onCapture: (screenshotDataURL: string) => void;
  onEditComplete: (editedScreenshotDataURL: string) => void;
}
const canvasStyles = {
    border: '1px solid black',
    position: 'absolute', // TypeScript should recognize 'absolute' as a valid value
    top: 0,
    left: 0,
  } as React.CSSProperties;
  

const ScreenshotEditor: React.FC<ScreenshotEditorProps> = ({ onCapture, onEditComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const handleCaptureClick = async () => {
    console.log('Capture button clicked'); // Debugging line
    try {
      const canvasElement = await html2canvas(document.body);
      const dataUrl = canvasElement.toDataURL('image/png');
      console.log('Screenshot captured'); // Debugging line
      onCapture(dataUrl);
      setIsEditing(true); // Enable editing mode
      initializeFabricCanvas(dataUrl);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const initializeFabricCanvas = useCallback((imageURL: string) => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        preserveObjectStacking: true // Ensure that the background image remains below the drawing
      });
      newCanvas.setHeight(window.innerHeight);
      newCanvas.setWidth(window.innerWidth);
  
      fabric.Image.fromURL(imageURL, (img: fabric.Image) => {
        // This is to add the image without scaling
        img.scaleToWidth(newCanvas.getWidth());
        img.scaleToHeight(newCanvas.getHeight());
        newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas), {
          originX: 'left',
          originY: 'top',
          crossOrigin: 'anonymous',
        });
        setCanvas(newCanvas);
      }, {
        crossOrigin: 'anonymous' // Added for CORS
      });
  
      newCanvas.isDrawingMode = true;
      setIsEditing(true);
    }
  }, []);
  
  
  const handleSave = () => {
    if (canvas) {
      // Specify the options object for the format
      const editedImage = canvas.toDataURL({
        format: 'png',
        quality: 1 // quality can be set from 0 to 1
      });
      const link = document.createElement('a');
      link.download = `edited_image_${new Date().toISOString()}.png`;
      link.href = editedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsEditing(false);
      onEditComplete(editedImage);
    }
  };
  
  
  
  
  
  

  useEffect(() => {
    if (!canvas && canvasRef.current && isEditing) {
      // The empty string is just a placeholder, you could remove this effect if not needed
      initializeFabricCanvas('');
    }
  }, [initializeFabricCanvas, canvas, isEditing]);

  if (!isEditing) {
    return <Button onClick={handleCaptureClick}>Capture Screenshot</Button>;
  }



  return (
    <div>
      <Button onClick={handleSave}>Save</Button>
      <canvas ref={canvasRef} style={canvasStyles} />
      {/* Additional editing tools can be added here */}
    </div>
  );
};

export default ScreenshotEditor;

