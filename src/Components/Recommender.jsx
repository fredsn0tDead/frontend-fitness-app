import React from 'react'
import{styled} from '@mui/system'

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { ExcersiseLog } from './ExcersiseLog';
import { Box, Grid,Paper,ThemeProvider,createTheme } from '@mui/material';
import { WorkoutCard } from './WorkoutCard';
import image1 from '../Assets/images/image1.jpg'
import { useState } from 'react';


import Gif1 from '../Assets/gif_images/barbell clean-grip front squat.gif'
import Gif2 from '../Assets/gif_images/barbell close-grip bench press.gif'
import Gif3 from '../Assets/gif_images/barbell high bar squat.gif'
import Gif4 from '../Assets/gif_images/barbell incline row.gif'
import Gif5 from '../Assets/gif_images/Barbell lunge.gif'
import Gif6 from '../Assets/gif_images/barbell pendlay row.gif'
import Gif7 from '../Assets/gif_images/barbell wide-grip upright row.gif'
import Gif8 from '../Assets/gif_images/biceps narrow pull-ups.gif'
import Gif9 from '../Assets/gif_images/kettlebell front squat.gif'
import Gif10 from '../Assets/gif_images/walking lunge.gif'
import Gif11 from '../Assets/gif_images/dumbbell romanian deadlift.gif'
import Gif12 from '../Assets/gif_images/barbell straight leg deadlift.gif'
import Gif13 from '../Assets/gif_images/barbell bench squat.gif'
import Gif14 from '../Assets/gif_images/barbell sumo deadlift.gif'
import Gif15 from '../Assets/gif_images/barbell wide-grip upright row.gif'
import Gif16 from '../Assets/gif_images/barbell incline row.gif'
import Gif17 from '../Assets/gif_images/Barbell lunge.gif'
import Gif18 from '../Assets/gif_images/cable lateral raise.gif'
import Gif19 from '../Assets/gif_images/dumbbell one arm bent-over row.gif'
import Gif20 from '../Assets/gif_images/dumbbell shrug.gif'
import Gif21 from '../Assets/gif_images/smith single leg split squat.gif'
import Gif22 from '../Assets/gif_images/dumbbell seated shoulder press.gif'
import Gif23 from '../Assets/gif_images/barbell lying triceps extension skull crusher.gif'
import Gif24 from '../Assets/gif_images/barbell straight leg deadlift.gif'
import Gif25 from '../Assets/gif_images/barbell bench press.gif'
import Gif26 from '../Assets/gif_images/barbell close-grip bench press.gif'
import Gif27 from '../Assets/gif_images/barbell lying triceps extension skull crusher.gif'
import Gif28 from '../Assets/gif_images/dumbbell one arm bent-over row.gif'
import Gif29 from '../Assets/gif_images/barbell sumo deadlift.gif'
import Gif30 from '../Assets/gif_images/barbell straight leg deadlift.gif'
import Gif31 from '../Assets/gif_images/barbell low bar squat.gif'
import Gif32 from '../Assets/gif_images/barbell high bar squat.gif'
import Gif33 from '../Assets/gif_images/weighted sissy squat.gif'
import Gif34 from '../Assets/gif_images/ez-bar close-grip bench press.gif'
import Gif35 from '../Assets/gif_images/dumbbell neutral grip bench press.gif'
import Gif36 from '../Assets/gif_images/cable lateral raise.gif'
const theme = createTheme();

const longtorso = [Gif1, Gif2, Gif3, Gif4, Gif5, Gif6, Gif7, Gif8, Gif9,Gif10,Gif11,Gif12]
const shorttorso = [Gif13, Gif14, Gif15, Gif16, Gif17, Gif18, Gif19, Gif20, Gif21,Gif22,Gif23,Gif24]
const proportionate = [Gif25, Gif26, Gif27, Gif28, Gif29, Gif30, Gif31, Gif32, Gif33,Gif34,Gif35,Gif36]

const useStyles = styled((theme) => ({
  button: {
    backgroundColor: 'white', // Initial background color
    transition: 'background-color 0.9 s ease', // Add a smooth transition for the background-color property
    '&:hover': {
      backgroundColor: 'grey', // Color to transition to on hover
    },
  },
}));

export const Recommender = () => {
  

  const handleExercise = () => {
    // Add your logic for handling the exercise button click here

  };

  const handleRecommendations = () => {
    // Add your logic for handling the recommendations button click here
  };

  const classes = useStyles();
  return (
    <Box 
    sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <ThemeProvider theme={theme}>
        <Box className={classes.button}  sx={{
          boxShadow:3,
          borderRadius: 1,
          bgcolor: 'background.paper',
          m: 1, 
          border: 1,
          maxWidth: 345,
        
  
          display: 'flex',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',

        }}>
          <Typography variant="h3">
         Pick excerises that work best with your build    </Typography>
         
        <Typography variant="h5"></Typography>
        </Box>
        </ThemeProvider>
    
        <ThemeProvider theme={theme}>
        <Box className={classes.button}  sx={{
          boxShadow:3,
          borderRadius: 1,
          bgcolor: 'background.paper',
          m: 1, 
          border: 1,
          maxWidth: 345,
        
  
          display: 'flex',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',

        }}>
        <Typography variant="h5">
    Please Select Which Image best represents your anatomy

    </Typography>
         
        <Typography variant="h5"></Typography>
        </Box>
        </ThemeProvider>
    
    <Grid container spacing={2} pt={3.4} pl={2} pr={2}>
      <Grid item xs={4}>
      <WorkoutCard excerise_description={'With your short torso in comparision to your longer leg length this excesise selction will help empahisize the weighted stretch of various excersise without putting too much stress on the joints.'} excerise_array={longtorso}  img={image1} title ={'Long Torso Short Legs'} description={'These excersises will be more beneficial if you have a long torso and short legs'} />
      </Grid>  
      <Grid item xs={4}>
      <WorkoutCard excerise_description={'You guys have more of a stocky build with a longer torso and shorter legs so your potential for overall strenght is higher. These excersises will allow you to fully maximize that strength potential.'} excerise_array={shorttorso}  img={image1} title ={'Short Torso Long Legs'} description={'These excersises will be more beneficial if you have a short torso and long legs'}/>
      </Grid>  
      <Grid item xs={4}>
      <WorkoutCard excerise_description={'With a realtively "proportianal" build you are able to perform 90% of excersise without any excessive mobility drills. These are simple the exericises that stood the testament of time to put the most muscle on your frame.'} excerise_array={proportionate}  img={image1} title ={'Similar Torso to leg length'} description={'These excersises will be more beneficial if you have a more proportionate build'}/>
      </Grid>  
     
    </Grid>
    

    </Box>

  )
}
