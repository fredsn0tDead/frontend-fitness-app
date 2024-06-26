import React from 'react'

import { Box, Grid } from '@mui/material';
import { WorkoutCard } from './WorkoutCard';
import image2 from '../Assets/images/Gorilla.jpg'
import image3 from '../Assets/images/LankyBoi.jpg'
import image4 from '../Assets/images/NormalBoi.jpg'
import image5 from '../Assets/Trex.png'
import image6 from '../Assets/wingspan.png'

import IMAGE1 from '../Assets/Learn_More/LT_resized.png';
import IMAGE2 from '../Assets/Learn_More/LM_resized.png';
import IMAGE3 from '../Assets/Learn_More/LB_resized.png';
import IMAGE4 from '../Assets/Learn_More/ST_resized.png';
import IMAGE5 from '../Assets/Learn_More/SM_resized.png';
import IMAGE6 from '../Assets/Learn_More/SB_resized.png';


//"Posterior chain exercise (hamstrings, glutes) with some lower back involvement."
//"Triceps-focused isolation exercise with minimal torso involvement."

const longlegdescripition = [
  "Targets the posterior chain, including the hamstrings, glutes, lower back, and traps.",
  "Focuses on the quadriceps, with additional engagement of the core and upper back to stabilize the weight.",
  "Primarily targets the quadriceps and anterior core, with secondary involvement of the glutes and upper back.",
  "Emphasizes the quadriceps and glutes, while also engaging the hamstrings and core for stability.",
  "Focuses on the hamstrings and lower back, while also engaging the glutes.",
  "Targets the inner thighs, quadriceps, and glutes.",
  "Specifically targets the calf muscles, particularly the gastrocnemius and soleus, for lower leg strengthening.",
  "Primarily works the quadriceps and glutes, with additional focus on balance and core stability.",
  "Designed to target the quadriceps, with secondary emphasis on the glutes and hamstrings.",
  "Focuses on the quadriceps, glutes, and hamstrings, offering stability for those new to lunges.",
  "Primarily strengthens the calf muscles, enhancing lower leg power and stability.",
  "Targets the quadriceps, glutes, and core, with an added cardiovascular benefit from the dynamic movement."
];


const shortarmsdescription = [
  "Targets the chest muscles primarily, with secondary engagement of the triceps and shoulders.",
  "Isolates the triceps by extending the arms and lifting the weight overhead while lying on a bench.",
  "Focuses on the pectoral muscles, allowing for a greater stretch and contraction than a standard bench press.",
  "Strengthens the shoulder muscles, including the anterior, medial, and posterior deltoids, with auxiliary use of triceps.",
  "Emphasizes the biceps, with the incline position targeting the long head of the muscle more effectively.",
  "Works on the back muscles, particularly the latissimus dorsi, with secondary engagement of the biceps and shoulders.",
  "Targets the upper chest muscles, with the incline angle also engaging the shoulders and triceps to a greater extent.",
  "Focuses on the back muscles, especially the middle and lower traps and rhomboids, with the reverse grip enhancing biceps engagement."
]; 

const longarmsdescription = [
  "Combines elements of a skull crusher and a press to intensely target the triceps.",
  "Targets the upper back muscles, including the latissimus dorsi and rhomboids, with a focus on explosive power from the ground.",
  "Primarily strengthens the shoulders, with additional work on the triceps and upper chest when performed seated.",
  "Isolates the triceps, specifically targeting the long head of the muscle through the overhead extension movement.",
  "Utilizes body weight to focus on strengthening the triceps, similar to a skull crusher but with a more natural movement pattern.",
  "Emphasizes the biceps with a close grip on the cable, allowing for a concentrated curl with constant tension.",
  "Focuses on the triceps, with the close grip also engaging the chest and shoulders to a lesser extent."
];

const shorttorsoDescriptions = [
  "Bench Press with arms a little wider than shoulder width targeting chest, triceps and shoulders.",
  "Upper back exercise with moderate high core and lower back engagement focusing on rowing to your belly.", // Barbell Bent Over Row
    "Lower body exercise with emphasis on the quads and glutes,the bar will be resting a little lower on your back.", // Barbell Low Bar Squat
    "Lower body exercise focusing on the quads less on glute with a more knees forward position.", // Barbell Narrow Squat
    "Quad-focused exercise with significant core and upper back stabilization, requiring a high shoulder mobility.", // Barbell Overhead Squat
    "Hip-dominant full body excerise, requirg more quad engagement than conventional deadlift.",
    "Single-leg exercise that strengthens the quads, glutes, and hamstrings, while stepping backward", // Barbell Sumo Deadlift 
    "Exercise primarily targeting the calf muscles in a seated position for greater stability and comfort.", // Dubbell Seated Calf Raise
    "Lower body exercise emphasizing the quads and glutes, with core involvement.", // Dumbbell Reverse Lunge
];

const proportionateDescriptions = [
  "Targets primarily the chest, with secondary engagement of triceps and deltoids.",
  "Engages the posterior chain, including glutes, hamstrings, and lower back, with emphasis on overall strength.",
  "Focuses on the posterior chain and quads, with the low bar position emphasizing hip drive and hamstring involvement.",
  "Strengthens the deltoids comprehensively, with auxiliary involvement of triceps and upper chest.",
  "Works primarily on the latissimus dorsi, with engagement of the biceps and traps for unilateral back development.",
  "Targets the quadriceps, glutes, and hamstrings, with the machine providing stability and focus on leg strength.",
  "Emphasizes the quadriceps and glutes, with the high bar position also engaging the core and lower back.",
  "Targets the upper chest, with secondary focus on the shoulders and triceps, enhancing pectoral development."
];







export const Recommender = () => {
  
  function importAll(r) {
    return r.keys().map(r);
  }
  
  const imageFilesNB = require.context('../Assets/NB', false, /\.(gif)$/);
  const imagesFilesSA = require.context('../Assets/SAB', false, /\.(gif)$/);
  const imagesFilesLA = require.context('../Assets/LAB', false, /\.(gif)$/);
  const imagesFilesLLB = require.context('../Assets/LLB', false, /\.(gif)$/);
  const imagesFilesSLB = require.context('../Assets/SLB', false, /\.(gif)$/);
  
  
  
//Long legs
  const images = importAll(imagesFilesLLB);
  const imageArrayLLB = [];
  images.forEach((image, index) => {
    const fileName = image.split('/').pop(); 
    const nameWithoutExtension = fileName.split('.')[0];
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); 

    imageArrayLLB.push({
        src: image,
        alt: `Image ${index}`,
        name: exerciseName,
        description: longlegdescripition[index] 
    });
});
//Short Torso


const imagesSLB = importAll(imagesFilesSLB); 
const imageArraySLB = [];
imagesSLB.forEach((image, index) => {
    const fileName = image.split('/').pop(); 
    const nameWithoutExtension = fileName.split('.')[0];
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); 

    imageArraySLB.push({
        src: image,
        alt: `Image ${index}`,
        name: exerciseName,
        description: shorttorsoDescriptions[index] 
    });
});


// Normal Build

const imagesNB = importAll(imageFilesNB); 
const imageArrayNB = [];
imagesNB.forEach((image, index) => {
    const fileName = image.split('/').pop(); 
    const nameWithoutExtension = fileName.split('.')[0];
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); 

    imageArrayNB.push({
        src: image,
        alt: `Image ${index}`,
        name: exerciseName,
        description: proportionateDescriptions[index] 
    });
});
// for (let i = 0; i < imageArrayNB.length; i++) {
//   console.log(imageArrayNB[i].name);
// }
// Long Arms
const imagesLA = importAll(imagesFilesLA); 
const imageArrayLA = [];
imagesLA.forEach((image, index) => {
    const fileName = image.split('/').pop(); 
    const nameWithoutExtension = fileName.split('.')[0];
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); 

    imageArrayLA.push({
        src: image,
        alt: `Image ${index}`,
        name: exerciseName,
        description: longarmsdescription[index] 
    });
});

// Short Arms
const imagesSA = importAll(imagesFilesSA); 
const imageArraySA = [];
imagesSA.forEach((image, index) => {
    const fileName = image.split('/').pop(); 
    const nameWithoutExtension = fileName.split('.')[0];
    const exerciseName = nameWithoutExtension.replace(/_/g, ' '); 

    imageArraySA.push({
        src: image,
        alt: `Image ${index}`,
        name: exerciseName,
        description: shortarmsdescription[index] 
    });
});

  return (
    <Box 
    sx={{
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Fjalla One',
      marginLeft: {
          xs: 0,  // For extra-small screens and up
          sm: 0,  // For small screens and up
          md: 30, // For medium screens and up
      },
  }}>
        
    
    <Grid container spacing={2} pt={1} pl={2} pr={2} >
    
         <Grid item xs={4} >
            <WorkoutCard
              excerise_description={`With your short torso in comparison to your longer leg length, this exercise selection will help emphasize the weighted stretch of various exercises without putting too much stress on the joints.`}
              excerise_array={imageArrayLLB}
              img={image3}
              TP={IMAGE1}
              MP={IMAGE2}
              BP={IMAGE3}
              header={'Long Torso'}
              headline={'Read the information below if you think you might have a shorter torso in comparison to your legs'}
              main_description={`Try Squatting down to about 90 degrees like the woman in the photo your knees are prob wanting to go past your toes while your feel is leaving the ground. If your lucky and your ankle mobility is good you are still going to be in a similar position as the lady above having to lean to far forward on your descent.
              Keep this in mind and measure from the base of your ankle to your waist then measure your torso if the ratio from leg to torso is greater than 60%, these recommendations will hit certain muscle groups just as hard while not forcing you to be put in uncomfortable positions.
              `}
              bolded_description={`Important to note elevating your heel will allow you to temporarily fix this issue when squatting.`}

              learn_more_description={`Try Squatting down to about 45 degrees like the woman in the photos. Your knees are probably going to almost be going past your toes when your upper and lower legs are making a 100 degree angle which is not suitable for most exercises.\n
              Keep this in mind and measure your lower leg and upper then measure orso. If the ratio from leg to torso is greater than 60%, these recommendations may allow you to overcome this weakness while still allowing you to hit full ROM.
              Along with proper warm up and daily mobility, this will allow you to constantly display feats of strength you never knew you were capable of!!`}
              title={'Gracefully Elongated'}
              description={'These excersises will be more beneficial if you have a short torso and long legs. You will likely need a greater degree of flexibility than the other two. You more than likely will have a strong deadlift.'}
              
              
            />
          </Grid>

      <Grid item xs={4}>
      <WorkoutCard 
      excerise_description={'You guys have more of a stocky build with a longer torso and shorter legs so your potential for overall strenght is higher. These excersises will allow you to fully maximize that strength potential.'} 
      excerise_array={imageArraySLB}  img={image2} 
      title ={'Power Packed'} 
      description={'These exercises will be more beneficial if you have a long torso and short legs. You generally have an easy time squatting down. Your build is more stocky and you have a higher potential for strength.'}
      
       TP={IMAGE4}
       MP={IMAGE5}
       BP={IMAGE6}
       header={'Short Torso'}
       headline={'Read the information below if you think you might have a longer torso in comparison to your legs'}
       main_description={`Try Squatting down to about 90 degrees like the person in the photos as you can see your back is still very vertical along with  being able to hit 90 degrees without having your knees go past your toes or have your feet leave the ground
       Keep this in mind and measure your lower legged and upper  then measure your torso if the ratio from leg to torso is greater than 55% or less these recommendations may allow you to get more out of your stocky build in order to pack on as much mass as possible
       `}
      
       
       learn_more_description={`Try Squatting down to about 45 degrees like the woman in the photos. Your knees are probably going to almost be going past your toes when your upper and lower legs are making a 100 degree angle which is not suitable for most exercises.\n
       Keep this in mind and measure your lower leg and upper then measure orso. If the ratio from leg to torso is greater than 60%, these recommendations may allow you to overcome this weakness while still allowing you to hit full ROM.
       Along with proper warm up and daily mobility, this will allow you to constantly display feats of strength you never knew you were capable of!!`}
       />
      </Grid>  
      <Grid item xs={4}>
      <WorkoutCard excerise_description={'With a realtively "proportianal" build you are able to perform 90% of excersise without any excessive mobility drills. These are simple the exericises that stood the testament of time to put the most muscle on your frame.'} 
      excerise_array={imageArrayNB}  
      img={image4} 
      title ={'Naturally Balanced'} 
      description={'These excersises will be more beneficial if you have a more proportionate build. Your leveage is more balanced resulting in a more balanced physique. Majority of people will fall into this category .'} 
      TP={IMAGE4}
      MP={IMAGE5}
      BP={IMAGE6}
      
     />
      </Grid>  
      <Grid item xs={4} >
            <WorkoutCard
              excerise_description={`These power-packed excersises normally demand a great deal of stress for the range of motion they require. However you will be able to get the maximum benefit from them with your shorter wingspan.`}
              excerise_array={imageArraySA}
              img={image5}
           
              header={'T-Rex arms'}
              headline={'Unleashing the Mighty T-Rex: Conquering the Gym with Dino-Mite Arms!'}
              main_description={`Measure from your finger tips from one hand to the finger tips of your other hand. If this measurement is shorter than your height you may have a shorter wingspan than most and will be able to perform more reps with the same weight without putting to much stress on your joints.
              `}
              bolded_description={`You will most likely be able to move alot more weight than your long armed counter-parts.`}
              title={'T-Rex Arms'}
              description={'These power-packed excersises normally demand a great deal of stress for the range of motion they require. However you will be able to get the maximum benefit from them with your shorter wingspan.'}
              
              
            />
          </Grid>
          <Grid item xs={4} >
            <WorkoutCard
              excerise_description={`These excerises will allow you to maximize potential limiting factors that will arise from solely performing the standard squat, bench, deadlift.`}
              excerise_array={imageArrayLA}
              img={image6}
             
              header={'Long-Arms'}
              headline={'Long Arm of the Loft: Reaching New Heights in the Gym!'}
              main_description={`Measure from your finger tips from one hand to the finger tips of your other hand. If this measurement is greater than your height you may a longer wingspan than most likely not be able to perform as many reps than someone shorter without putting alot stress on your joints.
              `}
              title={'Wingspan Warrior'}
              bolded_description={`Important to note tricep training should take up the bulk of your arm training.`}

    
              description={'These excerises will allow you to maximize muscle building and strength potential, without the limiting factors that will arise from solely performing the standard squat, bench, deadlift.'}
              
              
            />
          </Grid>

     
    </Grid>
   
    </Box>

  )
}
