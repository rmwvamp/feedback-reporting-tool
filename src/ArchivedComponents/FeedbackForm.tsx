import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Import the empty star icon
import EditIcon from '@mui/icons-material/Edit';
import VideocamIcon from '@mui/icons-material/Videocam';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ScreenshotEditor from './ScreenshotEditor';



interface FeedbackFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number | null, comment: string, email: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [showScreenshotEditor, setShowScreenshotEditor] = useState(false);
  const [screenshotData, setScreenshotData] = useState<string | null>(null);

  const handleFormSubmit = () => {
    if (rating !== null) {
      onSubmit(rating, comment, email);
      onClose(); // Close the form upon submission
    }
  };
  const handleEditScreenshotClick = () => {
    setShowScreenshotEditor(true);
  };

  const handleScreenshotCapture = (screenshotDataURL: string) => {
    setScreenshotData(screenshotDataURL);
  };

  const handleEditComplete = (editedScreenshotDataURL: string) => {
    console.log(editedScreenshotDataURL);
    setShowScreenshotEditor(false);
  };


  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Feedback
        <IconButton 
          aria-label="close" 
          onClick={onClose} 
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
            <DialogContent>
        <Typography gutterBottom>
          How likely are you to recommend us to a friend or colleague?
        </Typography>
        
                <Box display="flex" alignItems="center">
          <Rating
            name="feedback-rating"
            value={rating}
            precision={1}
            onChange={(event, newValue) => setRating(newValue)}
            onChangeActive={(event, newHover) => setHover(newHover)}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            max={10} // Allow a range up to 10 stars
          />
{rating !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
        )}        </Box>
        <TextField
          fullWidth
          label="Write a comment or describe a problem."
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Your e-mail"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
          <Button startIcon={<EditIcon />} variant="outlined" onClick={handleEditScreenshotClick} fullWidth>
              Edit screenshot
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button startIcon={<VideocamIcon />} variant="outlined" fullWidth>
              Record video clip
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onClose} color="primary" fullWidth>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleFormSubmit} variant="contained" color="primary" fullWidth>
              Submit feedback
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
    {showScreenshotEditor && (
      <ScreenshotEditor onCapture={handleScreenshotCapture} onEditComplete={handleEditComplete} />
    )}
    </>
  );
};

// Replace RatingIcon with the correct icon you are using for the empty state
const RatingIcon = () => <span>☆</span>;

// This object will provide the label for each rating number
const labels: { [index: string]: string } = {
  1: '1 Star',
  2: '2 Stars',
  3: '3 Stars',
  4: '4 Stars',
  5: '5 Stars',
  6: '6 Stars',
  7: '7 Stars',
  8: '8 Stars',
  9: '9 Stars',
  10: '10 Stars',
};

export default FeedbackForm;
