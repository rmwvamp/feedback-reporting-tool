import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ScreenshotCapture from './ScreenshotCapture';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import VideoRecorder from './VideoRecorder'; // Import the VideoRecorder component

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps & {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}> = ({ open, onClose, isRecording, onStartRecording, onStopRecording }) => { const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [isScreenshotEditorOpen, setIsScreenshotEditorOpen] = useState(false);
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string | null>(null);

  const [videoDataUrl, setVideoDataUrl] = useState<string | null>(null);

  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const [isVideoRecorderOpen, setIsVideoRecorderOpen] = useState<boolean>(false);

  const handleVideoSave = (mediaBlobUrl: string) => {
    console.log('Video saved:', mediaBlobUrl);
    setIsVideoRecorderOpen(false); // Close the video recorder
  
    // Create a blob from the mediaBlobUrl if it's a string URL pointing to the blob
    fetch(mediaBlobUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a local URL from the blob
        const localUrl = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger download
        const anchor = document.createElement('a');
        anchor.href = localUrl;
        anchor.download = 'recording.mp4'; // You can specify a different file name and extension
        // document.body.appendChild(anchor); // Append anchor to body for the click to work
        // anchor.click();
  
        // Clean up the DOM and revoke the blob URL
        // document.body.removeChild(anchor);
        // window.URL.revokeObjectURL(localUrl);
      })
      .catch(console.error); // Log any errors during the process
      setVideoDataUrl(mediaBlobUrl);
      onStopRecording(); // Call this when recording stops
  };
  


  const handleCapture = async () => {
    // Clone the document body
    const bodyClone = document.body.cloneNode(true) as HTMLElement;

    // Setup the clone's style to ensure it's not visually disruptive
    bodyClone.style.position = 'absolute';
  bodyClone.style.top = `${-window.scrollY}px`;
bodyClone.style.left = '0';
    bodyClone.style.width = '100%';
  bodyClone.style.height = `${document.documentElement.scrollHeight}px`; // Adjust height to the full scrollable content
    // bodyClone.style.opacity = '0'; // invisible but still rendered

    // Append the clone to the body to ensure styles and images load correctly
    document.body.appendChild(bodyClone);

    // Hide elements in the clone
    const elementsToHide = bodyClone.querySelectorAll<HTMLElement>('.hide-for-screenshot, #feedback-dialog, .MuiBackdrop-root');
    elementsToHide.forEach(el => el.style.visibility = 'hidden');

    try {
      
            const canvas = await html2canvas(bodyClone, {
      backgroundColor: 'white',
      allowTaint: true,
      useCORS: true,
      width: window.innerWidth,
      height: window.innerHeight,
      logging: true,
 
      windowHeight: window.innerHeight,
    });

    setCanvasElement(canvas);
        // Remove the clone after capture
        document.body.removeChild(bodyClone);
        // Continue with your logic to handle the screenshot
        setIsScreenshotEditorOpen(true);
    } catch (error) {
        console.error('Error during html2canvas operation:', error);
    }
};




  const handleScreenshotSave = (dataUrl: string) => {
    // console.log(dataUrl);
    // setScreenshotDataUrl(dataUrl); // Save the screenshot data URL to state
    // setIsScreenshotEditorOpen(false); // Close the screenshot editor
    // // Trigger the download of the screenshot
    // const link = document.createElement('a');
    // link.href = dataUrl;
    // link.download = 'screenshot.png'; // You can customize the file name
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    setScreenshotDataUrl(dataUrl);
    setIsScreenshotEditorOpen(false); 
  };
  const handleCancelVideo = () => {
    // Perform the necessary state updates or cleanups needed when the video recording is canceled
    setIsVideoRecorderOpen(false); // Assuming you have a state to control the visibility of VideoRecorder
    // Other cleanup logic can go here
    onStopRecording(); // Call this when recording stops

  };

  const handleSubmitFeedback = (rating: number | null, comment: string, email: string) => {
    console.log({ rating, comment, email });
    // Handle the feedback submission, e.g., sending to an API
    onClose(); // Close the dialog after submission
  };
  const handleOnClick=()=>{
    setIsScreenshotEditorOpen(true)
  }
  const handleClose = () => {
    if (!isRecording) {
      onClose();
    }
  };
  return (
  <Dialog
  onClose={handleClose}
    open={open}
    PaperProps={{
      sx: {
        position: 'fixed',
        bottom: '0rem',
        right: '0rem',
        width: '31rem', 
        maxHeight: '40rem', 
        borderRadius: '0.5rem',
        overflow: 'auto',
      },
      className:'hide-for-screenshot' 
    }}
  >
 

      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', padding: '1rem' }}>
        Feedback
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: '0.5rem', top: '0.5rem', color: 'primary.contrastText' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '1.5rem' }}>
        <Typography gutterBottom sx={{ paddingTop: '1.5rem', }}>How likely are you to recommend us to a friend or colleague?</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' ,paddingTop: '0.5rem', paddingRight: '5rem'  }}>
        <Rating
  name="feedback-rating"
  value={rating}
  onChange={(event, newValue) => setRating(newValue)}
  emptyIcon={<StarBorderIcon fontSize="inherit" />}
  max={10}
  sx={{
    '& .MuiRating-icon': {
      marginRight: '0.6rem', // Adjust the right margin to increase space between stars
    },
    '& .MuiRating-iconFilled': {
      fontSize: '2.23rem', // This increases the size of the filled stars
    },
    '& .MuiRating-iconEmpty': {
      fontSize: '2.23rem', // This increases the size of the empty stars
    }
  }}
/>

        </Box>
   
        <Typography gutterBottom sx={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>
          Write a comment or describe a problem.
        </Typography>
        <TextField
          id="comment"
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
        />

<Typography gutterBottom sx={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>
          Your E-mail
        </Typography>
        <TextField
          id="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


<Box sx={{ mt: 2, textAlign: 'left',}}>
  <Box sx={{ mb: '1rem' }}> {/* Adjusted margin to increase gap between links */}
    <CameraAltIcon sx={{ verticalAlign: 'middle', mr: '0.5rem' }} /> {/* Adjusted margin to increase gap between icon and text */}
    <Link
      href="#"
      underline="hover"
      // onClick={handleOnClick}
      onClick={(e) => { e.preventDefault();handleCapture();}}
    
      sx={{ verticalAlign: 'middle' }}
    >
          {screenshotDataUrl ? 'Edit screenshot' : 'Add screenshot'} 
    </Link>
  </Box>
  <Box>
    <VideocamIcon sx={{ verticalAlign: 'middle', mr: '0.5rem' }} /> {/* Adjusted margin to increase gap between icon and text */}
    <Link
      href="#"
      underline="hover"
      onClick={(e) => { e.preventDefault(); console.log('Opening video recorder...');
      setIsVideoRecorderOpen(true); }}
      sx={{ verticalAlign: 'middle' }}
            

    >
          {videoDataUrl ? 'Preview video clip' : 'Record video clip'} 
    </Link>
    {isVideoRecorderOpen && (
        <VideoRecorder
          onSave={handleVideoSave}
          onCancel={handleCancelVideo}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
        />
      )}


  </Box>
</Box>


      </DialogContent>
      <Button
  onClick={() => handleSubmitFeedback(rating, comment, email)}
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    fontSize: '1rem',
    height: '3rem',
    padding: '6px 1rem',
    borderRadius: '0', // Set borderRadius to 0 to remove rounded corners
  }}
>
  Submit feedback
</Button>

{isScreenshotEditorOpen && (
      <ScreenshotCapture
        canvasElement={canvasElement}
        onClose={() => setIsScreenshotEditorOpen(false)}
        onSave={handleScreenshotSave}
      />
    )}

    </Dialog>
  );
};

export default FeedbackDialog;