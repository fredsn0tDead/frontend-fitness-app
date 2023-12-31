import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
export const WorkoutModal = ({ isOpen, handleClose, title, description }) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <p>{description}</p>
            {/* Add more content for the modal */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    };

