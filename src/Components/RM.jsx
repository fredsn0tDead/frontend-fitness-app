import React from 'react'
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid ,Card,Typography} from '@mui/material';

export const RM = ({ isOpen, handleClose ,excerise_array,excerise_description,ExerciseNames}) => {
  const [selectedGif, setSelectedGif] = useState(null);

  const handleGifClick = (index) => {
    setSelectedGif(index);
  };

  const handleModalClose = () => {
    setSelectedGif(null);
    handleClose();
  };
  const handleLearnMoreClick = () => {
    // Handle click on the selected GIF, e.g., navigate to a new modal with more information.
    // Add your logic here.
  };
  return (
    <Dialog open={isOpen} onClose={handleModalClose}>
      <DialogTitle>{excerise_description}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {excerise_array.map((image, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card onClick={() => handleGifClick(index,image)}>
                <img src={image.src} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', cursor: 'pointer' }} />
                
                <Typography variant="subtitle1"  sx={{fontFamily: 'Fjalla One',textAlign:'center', fontWeight:'bold'}}>
                {image.name ? image.name : 'Exercise Name Not Available'}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Close
        </Button>
        {selectedGif !== null && (
          <Button onClick={handleLearnMoreClick} color="primary">
            Learn More
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};