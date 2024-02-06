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
import image2 from '../Assets/images/Gorilla.jpg'
import image3 from '../Assets/images/LankyBoi.jpg'
import image4 from '../Assets/images/NormalBoi.jpg'
import { useState } from 'react';


import Barbell_Front_Squat from '../Assets/gif_images/Barbell_Front_Squat.gif'
import Close_Grip_Bench from '../Assets/gif_images/Close_Grip_Bench_Press.gif'
import High_Bar_Squat from '../Assets/gif_images/High_Bar_Squat.gif'
import Incline_Row from '../Assets/gif_images/Incline_Row.gif'
import Barbell_Lunge from '../Assets/gif_images/Barbell_Lunge.gif'
import Pendlay_Row from '../Assets/gif_images/Pendlay_Row.gif'
import Upright_Row from '../Assets/gif_images/Upright_Row.gif'
import Narrow_Pull_Up from '../Assets/gif_images/Narrow_Pull_Up.gif'
import Kettlebell_Front_Squat from '../Assets/gif_images/Kettlebell_Front_Squat.gif'
import Walking_Lunge from '../Assets/gif_images/Walking_Lunge.gif'
import Dumbbell_Romanian_Deadlift from '../Assets/gif_images/Dumbbell_Romanian_Deadlift.gif'
import Bench_Squat from '../Assets/gif_images/Bench_Squat.gif'
import Barbell_Sumo_Deadlift from '../Assets/gif_images/Barbell_Sumo_Deadlift.gif'
import Barbell_Reverse_Grip_Bench_Press from '../Assets/gif_images/Barbell_Reverse_Grip_Bench_Press.gif'
import Cable_Lateral_Raise from '../Assets/gif_images/Cable_Lateral_Raise.gif'
import One_Arm_Bent_Over_Row from '../Assets/gif_images/One_Arm_Bent_Over_Row.gif'
import Dumbbell_Shrug from '../Assets/gif_images/Dumbbell_Shrug.gif'
import Smith_machine_Single_Leg_Split_Squat from '../Assets/gif_images/Smith_machine_Single_Leg_Split_Squat.gif'
import Dumbbell_Seated_Overhead_Press from '../Assets/gif_images/Dumbbell_Seated_Overhead_Press.gif'
import Barbell_Lying_Triceps_Extensions from '../Assets/gif_images/Barbell_Lying_Triceps_Extensions.gif'
import Barbell_Straight_Legged_Deadlift from '../Assets/gif_images/Barbell_Straight_Legged_Deadlift.gif'
import Barbell_Bench_Press from '../Assets/gif_images/Barbell_Bench_Press.gif'
import Close_Grip_Bench_Press from '../Assets/gif_images/Close_Grip_Bench_Press.gif'
import Barbell_Low_Bar_Squat from '../Assets/gif_images/Barbell_Low_Bar_Squat.gif'
import Sissy_Squat from '../Assets/gif_images/Sissy_Squat.gif'
import EZ_Bar_Curl from '../Assets/gif_images/EZ_Bar_Curl.gif'
import Dumbell_Neutral_Grip_Extenstions from '../Assets/gif_images/Dumbell_Neutral_Grip_Extenstions.gif'



const theme = createTheme();

const longtorso = [Barbell_Front_Squat, Close_Grip_Bench, High_Bar_Squat, Incline_Row, Barbell_Lunge, Pendlay_Row, Upright_Row, Narrow_Pull_Up, Kettlebell_Front_Squat,Walking_Lunge,Dumbbell_Romanian_Deadlift,Barbell_Straight_Legged_Deadlift]
const shorttorso = [Bench_Squat, Barbell_Sumo_Deadlift, Barbell_Reverse_Grip_Bench_Press, Barbell_Lunge, Cable_Lateral_Raise, Dumbbell_Shrug,Upright_Row, Barbell_Front_Squat,EZ_Bar_Curl,Smith_machine_Single_Leg_Split_Squat,Dumbbell_Seated_Overhead_Press,Sissy_Squat]
const proportionate = [Barbell_Front_Squat, Barbell_Reverse_Grip_Bench_Press, Barbell_Lying_Triceps_Extensions, Smith_machine_Single_Leg_Split_Squat, Barbell_Straight_Legged_Deadlift, Barbell_Bench_Press, Barbell_Low_Bar_Squat, Sissy_Squat, EZ_Bar_Curl,Dumbell_Neutral_Grip_Extenstions,Dumbell_Neutral_Grip_Extenstions,Cable_Lateral_Raise]



const exerciseNames = (gifArray) => gifArray.map((gifPath) => {
  
    // simply take an input array of gif paths and return an array of exercise names
  // Use regular expression to extract the exercise name
  const match = gifPath.match(/\/static\/media\/(.+?)\.[a-f0-9]+\.gif/);
  // If a match is found, return the exercise name, otherwise return null
  return match ? match[1].replace(/_/g, ' ') : null;
}).filter(Boolean);

console.log(exerciseNames);

const longtorsoExerciseNames = exerciseNames(longtorso);
const shorttorsoExerciseNames = exerciseNames(shorttorso);
const proportionateExerciseNames = exerciseNames(proportionate);
console.log('Short Torso Exercise Names:', shorttorsoExerciseNames);
console.log('Short Torso Exercise Names:', shorttorso);

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
  
  function importAll(r) {
    return r.keys().map(r);
  }
  
  const imageFiles = require.context('../Assets/LB', false, /\.(gif)$/);
  const imageFilesGB = require.context('../Assets/GB', false, /\.(gif)$/);
  const imageFilesNB = require.context('../Assets/NB', false, /\.(gif)$/);

  const images = importAll(imageFiles);
  const imagesGB = importAll(imageFilesGB);
  const imagesNB = importAll(imageFilesNB);
  const imageArrayLB = [];
  const imageArrayGB = [];
  const imageArrayNB = [];
  
  images.forEach((image, index) => {
    const fileName = image.split('/').pop(); // Extracting the file name
    console.log(fileName);
    const nameWithoutExtension = fileName.split('.')[0]; // Removing the file extension
    console.log(nameWithoutExtension);
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); // Replace underscores with spaces
    imageArrayLB.push({
      src: image,
      alt: `Image ${index}`,
      name: exerciseName,
    });
  });
  imagesGB.forEach((image, index) => {
    const fileName = image.split('/').pop(); // Extracting the file name
    console.log(fileName);
    const nameWithoutExtension = fileName.split('.')[0]; // Removing the file extension
    console.log(nameWithoutExtension);
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); // Replace underscores with spaces
    imageArrayGB.push({
      src: image,
      alt: `Image ${index}`,
      name: exerciseName,
    });
  });
  imagesNB.forEach((image, index) => {
    const fileName = image.split('/').pop(); // Extracting the file name
    console.log(fileName);
    const nameWithoutExtension = fileName.split('.')[0]; // Removing the file extension
    console.log(nameWithoutExtension);
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); // Replace underscores with spaces
    imageArrayNB.push({
      src: image,
      alt: `Image ${index}`,
      name: exerciseName,
    });
  });


  const classes = useStyles();
  return (
    <Box 
    sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Fjalla One',
      }}>
        <ThemeProvider theme={theme}>
        <Box className={classes.button}  sx={{
          boxShadow:3,
          borderRadius: 1,
          bgcolor: 'background.paper',
          m: 1, 
          
          maxWidth: 345,
        
  
          display: 'flex',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          

        }}>
          <Typography variant="h3" sx={{fontFamily: 'Fjalla One',}}>
         Having Trouble Creating a Workout plan? We Got You Covered   </Typography>
         
        <Typography variant="h5"></Typography>
        </Box>
        </ThemeProvider>
    
        <ThemeProvider theme={theme}>
        <Box className={classes.button}  sx={{
          boxShadow:3,
          borderRadius: 1,
          bgcolor: 'background.paper',
          m: 1, 
         
          maxWidth: 345,
        
  
          display: 'flex',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',

        }}>
        <Typography variant="h5" sx={{fontFamily: 'Fjalla One'}}>
    Please Select Which Image best represents your anatomy

    </Typography>
         
        <Typography variant="h5"></Typography>
        </Box>
        </ThemeProvider>
    
    <Grid container spacing={2} pt={3.4} pl={2} pr={2} >
    {/* {longtorso.map((gif, index) => (
          <Grid item xs={4} key={index}>
            <WorkoutCard
              excerise_description={`With your short torso in comparison to your longer leg length, this exercise selection will help emphasize the weighted stretch of various exercises without putting too much stress on the joints.`}
              excerise_array={[gif]}
              img={image1}
           
              description={'These exercises will be more beneficial if you have a long torso and short legs'}
              ExerciseNames={longtorsoExerciseNames}
            />
          </Grid>
        ))} */}
         <Grid item xs={4} >
            <WorkoutCard
              excerise_description={`With your short torso in comparison to your longer leg length, this exercise selection will help emphasize the weighted stretch of various exercises without putting too much stress on the joints.`}
              excerise_array={imageArrayLB}
              img={image3}
              title={'Gracefully Elongated'}
              description={'These excersises will be more beneficial if you have a short torso and long legs. You more than likely will have a strong deadlift.'}
              
              ExerciseNames={longtorsoExerciseNames}
            />
          </Grid>

      <Grid item xs={4}>
      <WorkoutCard 
      excerise_description={'You guys have more of a stocky build with a longer torso and shorter legs so your potential for overall strenght is higher. These excersises will allow you to fully maximize that strength potential.'} 
      excerise_array={imageArrayGB}  img={image2} 
      title ={'Power Packed'} 
      description={'These exercises will be more beneficial if you have a long torso and short legs. Your build is more stocky and you have a higher potential for strength.'}
       ExerciseNames={shorttorsoExerciseNames}/>
       
      </Grid>  
      <Grid item xs={4}>
      <WorkoutCard excerise_description={'With a realtively "proportianal" build you are able to perform 90% of excersise without any excessive mobility drills. These are simple the exericises that stood the testament of time to put the most muscle on your frame.'} 
      excerise_array={imageArrayNB}  
      img={image4} 
      title ={'Naturally Balanced'} 
      description={'These excersises will be more beneficial if you have a more proportionate build. Your leveage is more balanced resulting in a more balanced physique.'} 
      ExerciseNames={proportionateExerciseNames}/>
      </Grid>  
     

     
    </Grid>
   
    </Box>

  )
}
