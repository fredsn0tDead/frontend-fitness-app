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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Datebar } from '../Components/Datebar.jsx';
import {auth} from '../Components/firebase.js'
import { getAuth, onAuthStateChanged,onIdTokenChanged  } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';

const StyledPaper = styled(Paper)({
  padding: '12px 24px',
  alignItems: 'center',
  justifyContent: 'center',
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
const StyledBox4 = styled(Paper)({
  
  width: 'auto',
  
  display: 'flex',
});
const TextContainer = styled(Box)({
  marginRight: '20px',
});


export const Dashboard = ({ showProfile,toggleProfile }) => {
    // const location = useLocation();
  // const { displayName, email, uid } = location.state || {};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exerciseNames, setExerciseNames] = useState('');
  const [user, setUser] = useState(null);
  const[workoutData, setWorkoutData] = useState(null);
  const [weightData, setWeightData] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const  {displayName, email, uid} =  location.state || {};
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
  
  const handleDateChange = (date, label) => {
    if (label === 'Start Date') {
      setStartDate(date);
    } else if (label === 'End Date') {
      setEndDate(date);
    }
    console.log('Date:', startDate, endDate);
  };
  const handleSearch = (newValue) => {
    setExerciseNames(newValue);
    console.log('Search:', newValue);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
  const fetchdata = async (e) => {
    
    //need to send the startdate, enddate, and exerciseNames to the backend
    // Need to format the dates first
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;
    
    const excersiseName =  exerciseNames;
    if (user && uid) {
      try {
        
        const idToken = await user.getIdToken(false);
        console.log(idToken);
        const response = await fetch(`http://127.0.0.1:5000/get-workout-new?start_date=${formattedStartDate}&end_date=${formattedEndDate}&excersiseName=${excersiseName}`, {
      method: "GET",
      headers: {
        Authorization: `${idToken}`,
        "Content-Type": "application/json",
        // Add any additional headers such as authorization token if required
      },

    });


    if (!response.ok) {
      throw new Error("Failed to fetch workout data");
    }

    const data = await response.json();
    setWorkoutData(data);
    console.log('workout deez',workoutData)
    console.log("Workout data:", data);
    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && data.message === 'No workouts found for the selected date range')) {
      setOpenSnackbar(true);
      setSnackbarMessage('No workouts found for the selected date range');
      
    } else {
      setOpenSnackbar(false);
    }
    
    // Process the retrieved workout data here
  } catch (error) {
    console.error("Error fetching workout data:", error.message);
  }
  }
};
  const formatDate = date => {
    // Implement your date formatting logic to match MongoDB custom_id
    // For example: YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const id = `${year}${month}${day}`;
    console.log(id);
    return `${year}${month}${day}`;
    
  };
  
  useEffect(() => {
    const auth = getAuth();

    // Use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state when authentication state changes
    });
    const unsubscribeIdToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        console.log('Refreshed ID token:', idToken);
        // You can use the refreshed token in your requests
      }
    });


    return () => {
      unsubscribe(); // Clean up the listener when the component unmounts
      unsubscribeIdToken();
    };
  }, []);
 
  const idArray = [];
  const weightArray = [];
  const repsArray = [];

  if (Array.isArray(workoutData) && workoutData.length <= 2) {
    workoutData.forEach((data) => {
      // Assuming data.Workoutdata is also an array
      data.Workoutdata.forEach((exercise) => {
        weightArray.push(exercise.weight);
        repsArray.push(exercise.reps);
      });
      idArray.push(data.id);
    });
  
    // Continue processing or rendering based on the populated arrays
  } else {
    // Handle the case when workoutData is not an array or is empty
    // For example, you can log a message or set default values
    console.log('workoutData is not an array or is empty. Component will continue rendering.');
  }
  
  
const weightDatapoints = weightArray.map(num => parseInt(num));
console.log(idArray);
console.log(weightDatapoints);
  return (
    <>
    <StyledPaper sx={{ justifyContent: 'center' }}>
      
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",paddingBottom:'4px',marginBottom:'8px' }}>
        Welcome Back {userDisplayName}! 
        {/* <Typography>Check Your Progress on a  <br/> Specific  Excerise! </Typography> */}
      </Typography>
    
      <Stack flexDirection='column' >
         
      <Searchbar handleSearch={handleSearch}/>
       
    
     
      <Box  gap={2} sx={{
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop:'4px'
       
      }} >
       <Datebar label="Start Date" onDateChange={(date) => handleDateChange(date, 'Start Date')} />
      <Datebar label="End Date" onDateChange={(date) => handleDateChange(date, 'End Date')} />
      <Button 
      sx={{
        padding:'9px 6.2px',
        marginTop:'6px',
      }}
      onClick={fetchdata}
      size="small"
      color="primary"
      variant="outlined"
      >
        Search Data
      </Button>
      <StyledBox4>
      <Typography variant="h5" component="div" 
      sx={{ 
        fontFamily: "Fjalla One", 
        textAlign:'center',
        padding:'1.5px 2px',
        marginTop:'2px',}} 
      >
          Look Back and see how far you've come!
        </Typography>
      </StyledBox4>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
    <MuiAlert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
    {snackbarMessage}
     </MuiAlert>
      </Snackbar>

      </Box>
      </Stack>
      {/* <StyledBox3>
        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}} >
          Your Workout Progression
        </Typography>
      </StyledBox3> */}
    
    </StyledPaper>
    <ColumnPaper>

    
    {/* <Grid  direction='row' container spacing={1} wrap='false' alignItems='stretch'   >
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
      </Grid> */}
      <StyledBox3>
        
        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
          Goal Progression: <Typography sx={{fontSize:'8px'}}> {exerciseNames} </Typography> 
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
            Max Weight (Ibs)
        </Typography>
          <GraphBox Datapoints={weightDatapoints} xAxialabel={'Weeks'} yAxislabel={'Weight (Ibs)'}/>
          
          <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
            Max Reps
        </Typography>
          <GraphBox xAxialabel={'Weight'} yAxislabel={'Reps'} Datapoints={weightDatapoints}/>

        </Box>
            
      </StyledBox3>
    </ColumnPaper>1

  {showProfile && <Profile showProfile={showProfile} toggleProfile={toggleProfile} onDisplayNameUpdate={handleDisplayNameUpdate} />}

  </>
  )
}

