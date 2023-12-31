import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';

export const RM = ({ isOpen, handleClose ,excerise_array,excerise_description}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{excerise_description}</DialogTitle>
      <DialogContent>
        
        <Grid container spacing={2}>
          {excerise_array.map((image, index) => (//all the gifs are put in an array and then mapped to the grid
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
