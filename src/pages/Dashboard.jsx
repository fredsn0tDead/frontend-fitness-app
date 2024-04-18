import React from 'react'
import{styled} from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { ExcersiseLog } from '../Components/ExcersiseLog';
import { Box,List,createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import IMG1 from '../Assets/pexels-zakaria-boumliha-2827392.jpg'
import IMG2 from '../Assets/pexels-leon-ardho-1552249.jpg'
import IMG3 from '../Assets/pexels-koolshooters-7346634.jpg'
import { ER_Card } from '../Components/ER_Card';
import { VideoBackground } from '../Components/VideoBackground';
import videoSource from '../Assets/VideoBackground.mp4'
import { PreviousWorkouts } from '../Components/PreviousWorkouts';
// import  {CardGalaxy}  from '../mui-treasury/card-galaxy/CardGalaxy.tsx';//when importing 
import {CardHighlight} from '../mui-treasury/card-highlight/CardHighlight.tsx'
import {test} from '../mui-treasury/card-highlight/test.jsx'
import image1 from '../Assets/Fitness_logo.png'
import image2 from "../Assets/workout_log.jpg";
import image3 from "../Assets/recommendations.jpg";
import image4 from "../Assets/fitness_logo2.png";
import image5 from "../Assets/images.jpeg";
import { Profile } from '../Components/Profile.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { SideBar } from '../Components/SideBar.jsx';
import {Avatar} from '@mui/material'
// Profile I want a side bar that comes down when the page is loaded with edit display name
import { Searchbar } from '../Components/Searchbar.jsx';
import { GraphBox } from '../Components/GraphBox.jsx';
import { SlideCarousel } from '../Carousel/SlideCarousel.jsx';
import { Stack } from '@mui/material';
import Color from "color";
// const Tracker = styled(Paper)({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minHeight: '10vh',
//   padding: '8px', // Use the desired padding value

// });
// const RootContainer = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '10vh',
//     padding: '8px', // Use the desired padding value
//     paddingTop: '20px',
//   });
  

//   const ActionButtonsContainer = styled('div')({
//     display: 'table',
//     justifyContent: 'space-between',
//     marginTop: '16px', // Use the desired margin value
//     '& > div': {
//       marginRight: '16px', // Add space between the ER_Card components
//       flex: '1', // Ensure each ER_Card takes equal space
//     },
//    paddingLeft: '240px',
//   });
 
//   // used to search for older workouts create a new workout and view your progress
//   //should be able to output a graph of your progress
const StyledPaper = styled(Paper)({
  padding: '12px 24px',
  display: 'flex',
  alignItems: 'center',
  marginLeft:'190px',
  marginTop:'20px',
});

const ColumnPaper = styled(Paper)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  marginTop:'20px',
  marginLeft:'190px',
  
});
const StyledBox = styled(Paper)({
  padding: '20px',
  alignItems: 'center',
  width: 'auto',

  display: 'flex',
});
const StyledBox2 = styled(Paper)({
  padding: '20px',
  alignItems: 'center',
  marginBottom: '20px',
  width: 'auto',

  display: 'flex',
});
const StyledBox3 = styled(Paper)({
  padding: '20px',
  
  marginBottom: '20px',
  width: 'auto',

  display: 'flex',
});
const TextContainer = styled(Box)({
  marginRight: '20px',
});


export const Dashboard = ({ showProfile,toggleProfile }) => {
    // const location = useLocation();
  // const { displayName, email, uid } = location.state || {};
  
  const location = useLocation();
  const navigate = useNavigate();
  const  {displayName, email, uid} =  location.state || {};
  const [userDisplayName, setUserDisplayName] = useState(
    localStorage.getItem('userDisplayName') || displayName || ''
  );
  
 

 

  useEffect(() => {
    localStorage.setItem('userDisplayName', userDisplayName);
  }, [userDisplayName]);

  const handleDisplayNameUpdate = (newDisplayName) => {
    setUserDisplayName(newDisplayName);
    console.log('New display name:', newDisplayName);
  };
 
  return (
    <>
    <StyledPaper>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'left' }}>
        Good Mourning {userDisplayName}!
      </Typography>
      <Searchbar/>
    </StyledPaper>
    <ColumnPaper>

    
    <Grid  direction='row' container spacing={1} wrap='false' alignItems='stretch'   >
    <List item>
    <StyledBox > 
      <TextContainer>
        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One"}}>
          Your Fitness Journey Starts Here.
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontFamily: "Fjalla One" }}>
          We offer a variety of tools to help you reach your fitness goals. Whether its an improved workout system or a personalized workout plan, we have you covered.
        </Typography>
        
        
      </TextContainer>
    

    </StyledBox>
    </List>
     <List item>
    <StyledBox2 >

        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
          Proven Workout Plans
        </Typography>
     
    </StyledBox2>
    </List>
    <List item>
    <StyledBox2 >

        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One"}}>
          Effortless Workout Tracking
        </Typography>

    </StyledBox2>
    </List>
    <List item>
    <StyledBox2 >
     
        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One"}}>
          Create your own
        </Typography>
   
    </StyledBox2>
    </List> 
      </Grid>
      <StyledBox3>
        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
          Goal Progression
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px', // Use the desired padding value
          paddingTop: '20px',
        }} >
           <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
            Max Weight
        </Typography>
          <GraphBox/>
          <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
            Max Reps
        </Typography>
          <GraphBox/>

          


        </Box>

      </StyledBox3>
    </ColumnPaper>1
    
       
    {/* <RootContainer>
    
      <ActionButtonsContainer>
      
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }}>
        Track Your Progress Over Time
      </Typography>
      <Grid wrap={"nowrap"} container spacing={4}  
       sx={{
      '@media (max-width: 960px)': {
       flexDirection: 'column',
       alignItems: 'center', // Change direction to column on medium screens
       paddingTop: '10px', // Use the desired padding value
      
    },
  }} > */}
    
    {/* <Grid item>
        <Typography variant='5' component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }}>
          View Your Previous Workouts
        </Typography>
          <PreviousWorkouts />
        </Grid>
        <Grid item>
          <Typography variant='h5'component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }} > Statistics </Typography>
          <GraphBox/>
          
      </Grid> */}
      {/* <Grid item>
          <CardHighlight 
          color1 = "#5357ce"
          brand1={'Excerise Workout Log'} 
          backgorundImage1={image2} 
          cover1 ={image1} 
          description={ <>
                    Track your fitness
                    <br />Workout Plan
                  </>
                  }
          onClick={() => {
            navigate('/exercise-log', { state: { displayName, email, uid } });
          }}
                  />
          
        </Grid>

        <Grid item>
            <CardHighlight 
          color1="#fc7944"
          brand1={'Excerise Recommendations'} 
          backgorundImage1={image3} 
          cover1 ={image4} 
          description={<>
            Need Help 
            <br /> Your Perfect Workout Plan 
            <br/>is one click away
          </>}
          onClick={() => {
            navigate('/recommender', { state: { displayName, email, uid } });
          }}
          />
        </Grid> */}
       
        
    
    {/* </Grid>
    <Grid wrap={"nowrap"} container spacing={4}  
       sx={{
      '@media (max-width: 960px)': {
       flexDirection: 'column',
       alignItems: 'center', // Change direction to column on medium screens
       paddingTop: '10px', // Use the desired padding value
      
    },
  }} >
    
    <Grid item>
        <Typography variant='5' component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }}>
          View Your Previous Workouts
        </Typography>
          <PreviousWorkouts />
        </Grid>
        <Grid item>
          <Typography variant='h5'component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }} > Statistics </Typography>
          <GraphBox/>
          
      </Grid>
      </Grid> */}
    {/* <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px', // Use the desired padding value
      paffingTop: '20px',
   }} > */}
      
      {/* <Grid container spacing={4} flexDirection='row' >
        
        <Grid item>
        <Typography variant='5' component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }}>
          View Your Previous Workouts
        </Typography>
          <PreviousWorkouts />
        </Grid>
        <Grid item>
          <Typography variant='h5'component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'center' }} > Statistics </Typography>
          <GraphBox/>
          
      </Grid>
        </Grid> */}
 
    

      {/* </ActionButtonsContainer>
   
  </RootContainer> */}

  {showProfile && <Profile showProfile={showProfile} toggleProfile={toggleProfile} onDisplayNameUpdate={handleDisplayNameUpdate} />}

  </>
  )
}

