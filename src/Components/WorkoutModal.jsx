import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const WorkoutModal = ({ isOpen, handleClose, title ,TP,MP,BP,learn_more_description,header,headline,main_description,bolded_description}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs"  PaperProps={{
      style: {
        borderRadius: '30px',
        // Add more styles here as needed
      },
    }}>
      <DialogTitle style={{textAlign:'center',fontSize: '19px',fontWeight:'bold'}}>{title}</DialogTitle>
      <DialogContent>
        {/* Set spacing to 0 to remove space between Grid items */}
        <Box style={{
          borderRadius: '30px'

        }}>
        <Grid container justifyContent="center" alignItems="center" spacing={0} >
          {/* Remove padding to have images touch each other */}
          <Grid item xs={3}>
            <img src={TP}  alt='' style={{ width: '110%', height: 'auto',borderTopLeftRadius: '30px',borderBottomLeftRadius: '30px'  }} />
          </Grid>
          <Grid item xs={3}>
            <img src={MP} alt='' style={{ width: '110%', height: 'auto' }} />
          </Grid>
          <Grid item xs={3}>
            <img src={BP} alt='' style={{ width: '110%', height: 'auto', borderTopRightRadius: '30px' ,borderBottomRightRadius: '30px' }} />
          </Grid>
        </Grid>
        </Box>
        {/* <Typography variant="body1" align="center" gutterBottom style={{ marginTop: '16px' ,fontFamily: 'Fjalla One', fontSize: '12px' }}>
          {learn_more_description}
        </Typography> */}
        <Box style={{borderRadius: '30px', // Applies the rounded corners
      border: '1px solid #ccc', // Applies a thin border line; change the color as needed
      backgroundColor: '#f5f5f5', // Background color of the box
      padding: '10px', // Padding inside the box
      marginTop: '1px', // Margin at the top of the box
    }}>
        <Typography variant="body1" align="left" gutterBottom style={{ marginTop: '4px' ,fontFamily: 'Fjalla One', fontSize: '8px', fontWeight:'thin' }}>
          {header}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom style={{ marginTop: '4px' ,fontFamily: 'Fjalla One', fontSize: '12px', fontWeight:'700' }}>
         {headline}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom style={{ marginTop: '4px' ,fontFamily: 'Fjalla One', fontSize: '15px', fontWeight:'200'}}>
        {main_description}
     
        <Typography style ={{ marginTop: '4px' ,fontFamily: 'Fjalla One', fontSize: '15px', fontWeight:'800' }}>
        {bolded_description}
        </Typography>
        </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
