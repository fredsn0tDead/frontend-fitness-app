
import React from 'react'
import { Card, CardContent, CardMedia, Typography, styled } from '@mui/material';


//White card with a shadow
//used to display information
//Image in the background with a title and description


//Image
const useStyles = styled((theme) => ({
    card: {
        maxWidth: 300,
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: '#f0f0f0', // Add a background color on hover
        },
        cursor: 'pointer',
      },
      media: {
        height: 0,
        paddingTop: '56.25%',
      },
      content: {
        padding: theme.spacing(2),
      },
    }));
  
export const ER_Card = ({title , image,description,onClick}) => {
    const classes = useStyles();
  return (
    
    <Card className={classes.card} onClick={onClick}>
    <CardMedia
      className={classes.media}
      component="img"
      alt={title}
      image={image}
    />
    <CardContent className={classes.content}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
  )
}
