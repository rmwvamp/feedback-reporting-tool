import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FeedbackDialog from './FeedbackDialog';

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Don't close if recording is active
    if (!isRecording) {
      setOpen(false);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <>
      {!open && (
        <Box 
          sx={{
            position: 'fixed',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
          }}
        >
          <Button 
            onClick={handleOpen} 
            variant="contained" 
            color="primary"
            className="writing-vertical-rl rotate-18 h-32 w-12 min-w-[40px] text-base leading-none rounded-none transition-all duration-300 hover:scale-110 hover:shadow-lg"

            sx={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              height: '8rem',
              width: '3rem',
              minWidth: '40px',
              fontSize: '1rem',
              lineHeight: 1,
              borderRadius: '0',
              transition: 'all 0.3s ease', // Smooth transition for hover effects
              '&:hover': {
                transform: 'rotate(180deg) scale(1.1)', // Slightly grow in size
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)', // Add shadow for depth
                // Optionally, change the color on hover to make it more vibrant
                // backgroundColor: 'secondary.main', 
              },
            }}
          >
            Feedback
          </Button>
        </Box>
      )}
      <FeedbackDialog
        open={open}
        onClose={handleClose}
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />    </>
  );
};

export default FeedbackButton;
