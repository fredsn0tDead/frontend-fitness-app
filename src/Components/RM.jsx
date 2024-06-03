import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

const GifContainer = styled('div')`

  transition: opacity 0.3s ease-in-out;
`;

export const RM = ({ isOpen, handleClose, excerise_array, excerise_description }) => {
    const [selectedGif, setSelectedGif] = useState(null);

    const handleGifClick = (index) => {
        setSelectedGif((prevState) => prevState === index ? null : index);
    };

    const handleModalClose = () => {
        setSelectedGif(null);
        handleClose();
    };

    

    return (
        <Dialog open={isOpen} onClose={handleModalClose}>
            <DialogTitle>{excerise_description}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {excerise_array.map((image, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <Card
                                onClick={() => handleGifClick(index)}
                                className={`gif-card ${selectedGif === index ? 'selected' : ''}`}
                            >
                                <Typography variant="subtitle1" sx={{
                                     fontFamily: 'Fjalla One',
                                     textAlign: 'center',
                                     fontWeight: 'bold' }}>
                                    {image.name ? image.name : 'Exercise Name Not Available'}
                                </Typography>

                                {selectedGif === index ? (
                                    <GifContainer>
                                        <img
                                            src={image.src}
                                            alt={` ${index + 1}`}
                                            className="gif-image"
                                        />
                                    </GifContainer>
                                ) : (
                                    <Typography variant="subtitle1" sx={{
                                        fontFamily: 'Fjalla One',
                                        textAlign: 'center'
                                    }}>
                                        {image.description}
                                    </Typography>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose} color="primary"> Close </Button>
            </DialogActions>
        </Dialog>
    );
};