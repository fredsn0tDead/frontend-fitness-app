import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import Gif1 from '../Assets/gif_images/barbell clean-grip front squat.gif'
import Gif2 from '../Assets/gif_images/barbell close-grip bench press.gif'
import Gif3 from '../Assets/gif_images/barbell high bar squat.gif'
import Gif4 from '../Assets/gif_images/barbell incline row.gif'
import Gif5 from '../Assets/gif_images/Barbell lunge.gif'
import Gif6 from '../Assets/gif_images/barbell pendlay row.gif'
import Gif7 from '../Assets/gif_images/barbell wide-grip upright row.gif'
import Gif8 from '../Assets/gif_images/biceps narrow pull-ups.gif'
import Gif9 from '../Assets/gif_images/kettlebell front squat.gif'
export const RecommenderModal = ({ isOpen, handleClose,shorttorso }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>These Excersises are best selected for your unique build</DialogTitle>
      <DialogContent>
        
        <Grid container spacing={2}>
          {shorttorso.map((image, index) => (//all the gifs are put in an array and then mapped to the grid
            <Grid item xs={6} sm={4} md={3} key={index}>
              <img src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '100%' }} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
 
  )
}
