import React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export const Recomendationsmodal = ({gifs}) => {

  const [open, setopen] = useState(false);
  const  [selectedgif, setSelectedgif] = useState(null);

const handleOpen = (gif) => {
    setSelectedgif(gif);
    setopen(true);
    }
const handleClose = () => {
    
    setopen(false); 
    }

  return (
    <>
    <Grid container spacing={2}>
      {gifs.map((gif, index) => (
        <Grid item key={index}>
          <Card onClick={() => handleOpen(gif)}>
            <CardMedia
              component="img"
              height="140"
              image={gif.url}
              alt={gif.name}
            />
            <CardContent>
              <Typography variant="subtitle2">{gif.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Selected Image</DialogTitle>
      <DialogContent>
        {selectedgif && (
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={selectedgif.url}
              alt={selectedgif.name}
            />
            <CardContent>
              <Typography variant="h6">{selectedgif.name}</Typography>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
}
