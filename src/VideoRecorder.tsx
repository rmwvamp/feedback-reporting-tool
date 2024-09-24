import React, { useState, useRef, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import VideocamIcon from '@mui/icons-material/Videocam';
import StopIcon from '@mui/icons-material/Stop';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import Typography from '@mui/material/Typography';

interface VideoRecorderProps {
  onSave: (mediaBlobUrl: string) => void;
  onCancel: () => void;
}

const VideoRecorder: React.FC<VideoRecorderProps & {
  onStartRecording: () => void;
  onStopRecording: () => void;
}> = ({ onSave, onCancel, onStartRecording, onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const {
    status,
    startRecording: originalStartRecording,
    stopRecording: originalStopRecording,
    mediaBlobUrl,
    clearBlobUrl,
    error,
  } = useReactMediaRecorder({
    screen: true,
    onStop: (blobUrl, blob) => {
      // You may handle the onStop event here
    },
  });
  const videoRef = useRef<HTMLVideoElement>(null); 

  useEffect(() => {
    if (error) {
      console.error(`MediaRecorder Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      originalStopRecording();
      clearBlobUrl();
    };
  }, []);

  const handleSave = () => {
    if (mediaBlobUrl) {
      onSave(mediaBlobUrl);
      clearBlobUrl();  // Optional: Clear the URL after saving
    }
  };

  const handleCancel = () => {
    setIsRecording(false);
    clearBlobUrl();
    onCancel();
  };

  const handleReRecord = () => {
    setIsRecording(true);
    clearBlobUrl();
    originalStartRecording();
  };

  const startRecording = () => {
    setIsRecording(true);
    setShowOverlay(false);
    originalStartRecording();
    onStartRecording(); // Notify that recording has started
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowOverlay(true);
    originalStopRecording();
    // onStopRecording(); // Notify that recording has stopped
  };

  // Adjust the style of your modal here
  const modalStyle = {
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0.5rem 1rem',
    background: '#4dabf5',
    borderRadius: '6px',
    zIndex: 10,
    width: 'auto',
    minWidth: '100px',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap', // This prevents the text from wrapping

  };

  const boxContainerStyle = {
    background: '#fff', // Use your desired background color
    borderRadius: '8px', // Adjust for desired border radius
    padding: '8px', // Adjust padding to create space inside the box
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items vertically
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Simple shadow for depth
    maxWidth: '600px', // Maximum width of the container box
    width: '80%', // Use a percentage to maintain some responsiveness
    margin: 'auto', // This will center the box horizontally
  };
  
  // Adjust the overlayStyle to properly center the new box container
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const videoStyles = {
    maxWidth: '90%',
    maxHeight: '90%',
    zIndex: 10,
    marginBottom: '16px',

  };

  const [showOverlay, setShowOverlay] = useState(true);
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Prevent clicks on the overlay from doing anything if recording
    if (isRecording) {
      e.stopPropagation();
    }
  };



  

  return (
    <>
      <Box sx={modalStyle}>
        {/* Modal with buttons will always be visible */}
        <Tooltip title="Start Recording" aria-label="start">
          <span>
            <IconButton onClick={startRecording} disabled={status === 'recording'} color="default">
              <VideocamIcon  sx={{ color: 'white' }}/>
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Stop Recording" aria-label="stop">
          <span>
            <IconButton onClick={stopRecording} disabled={status !== 'recording'} color="default">
              <StopIcon sx={{ color: 'white' }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Save Recording" aria-label="save">
          <span>
            <IconButton onClick={handleSave} disabled={!mediaBlobUrl} color="default">
              <SaveIcon  sx={{ color: 'white' }}/>
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Close" aria-label="close">
          <IconButton onClick={handleCancel} color="default">
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Box>
      {showOverlay && status === 'stopped' && mediaBlobUrl && (
        <Box sx={overlayStyle}>
          <Box sx={boxContainerStyle}> {/* New box container */}
            <video ref={videoRef} src={mediaBlobUrl} controls style={videoStyles} />
            <Box sx={{ marginTop: '16px' }}> {/* Additional Box for buttons to provide spacing */}
              <Button onClick={handleReRecord} variant="contained" color="primary" sx={{ marginRight: '8px' }}>
                Record Again
              </Button>
              <Button onClick={handleCancel} variant="contained" color="primary">
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
            {isRecording && (
        <Box
          onClick={handleOverlayClick}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 'modal', // Use the theme's z-index for modals, or set a high value like 1300
          }}
        />
      )}
    </>
  );
  
};

export default VideoRecorder;
