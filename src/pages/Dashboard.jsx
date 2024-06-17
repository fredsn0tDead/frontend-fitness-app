import React from 'react'
import{styled} from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import image6 from "../Assets/beforew.png";
import image7 from "../Assets/afterw.png";
import image8 from "../Assets/Before.jpg";
import image9 from "../Assets/After.jpg";
import { Profile } from '../Components/Profile.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
// Profile I want a side bar that comes down when the page is loaded with edit display name
import { Searchbar } from '../Components/Searchbar.jsx';
import { GraphBox } from '../Components/GraphBox.jsx';
import { Stack } from '@mui/material';
import { Datebar } from '../Components/Datebar.jsx';
import { getAuth, onAuthStateChanged,onIdTokenChanged  } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function convertMonthToNumber(month) {
  return monthNames[month];
}
const monthNames = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const StyledPaper = styled(Paper)({
  padding: '12px 24px',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:'190px',
  marginTop:'20px',
  backgroundColor: '',
  
});

const ColumnPaper = styled(Paper)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  marginTop:'20px',
  marginLeft:'190px',
  
});

const StyledBox1 = styled('div')({
  padding: '20px',
  alignItems: 'center',
  width: 'auto',

  display: 'inline-flex',
});

const FlippingImage = styled('img')({
  width: '150px',
  height: 'auto',
  transition: 'transform 0.5s',
  cursor: 'pointer',
  backfaceVisibility: 'hidden',
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



export const Dashboard = ({ showProfile,toggleProfile }) => {
    // const location = useLocation();
  // const { displayName, email, uid } = location.state || {};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exerciseNames, setExerciseNames] = useState('');
  const [user, setUser] = useState(null);
  const[workoutData, setWorkoutData] = useState(null);
  
  const location = useLocation();
  const  {displayName, uid} =  location.state || {};
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [userDisplayName, setUserDisplayName] = useState(
    localStorage.getItem('userDisplayName') || displayName || ''
  );
  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = () => setIsFlipped(!isFlipped); 
 
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
    
    if (!exerciseNames.trim()) {
      setOpenSnackbar(true);
      setSnackbarMessage("Look for an exercise in your program");
      return;
    }
    // Check if either start or end date is empty
  if (!startDate || !endDate) {
    setOpenSnackbar(true);
    setSnackbarMessage("Enter both start and end dates");
    return;
  }
  
    // Check if start date is before end date
    if (startDate && endDate && startDate >= endDate) {
      setOpenSnackbar(true);
      setSnackbarMessage("Enter an appropriate date. Start date must be before end date");
      return;
    }
    //need to send the startdate, enddate, and exerciseNames to the backend
    // Need to format the dates first
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;
    
    const excersiseName =  exerciseNames;
    if (user && uid) {
      try {
        
        const idToken = await user.getIdToken(false);
        console.log(idToken);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-workout-new?start_date=${formattedStartDate}&end_date=${formattedEndDate}&excersiseName=${excersiseName}`, {
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
  console.log('workoutData:', workoutData);
  if (Array.isArray(workoutData) && workoutData.length <= 2) {
    workoutData.forEach((data) => {
      // Assuming data.Workoutdata is also an array
      const id = data.id;
      console.log('id:', id);
      data.Workoutdata.forEach((exercise) => {
        weightArray.push(exercise.weight);
        repsArray.push(exercise.reps);
      });
      idArray.push(data.id);
    });
    console.log('repsArray:', repsArray);
    console.log('idArray:', idArray);
    // Continue processing or rendering based on the populated arrays
  } else {
    // Handle the case when workoutData is not an array or is empty
    // For example, you can log a message or set default values
    console.log('workoutData is not an array or is empty. Component will continue rendering.');
  }

const repsdatapoints = repsArray.map(num => parseInt(num));
const weightDatapoints = weightArray.map(num => parseInt(num));
const formattedData = idArray.map((id) => {
  // Extract the day part (YYYYMMDD) from the id
  const dayPart = id.substring(0, 8);
  // Convert the day part to a format suitable for the chart, for example, MM/DD/YYYY
  const formattedDate = `${dayPart.substring(4, 6)}/${dayPart.substring(6, 8)}/${dayPart.substring(0, 4)}`;
  return formattedDate;
});
const formattedData1 = formattedData.map((dateString) => new Date(dateString));
const xAxisLabelsDate = formattedData1.map((dateObject) => {
  // Use dateObject to format the label (e.g., dateObject.getDate())
  return `May ${dateObject.getDate()}`;
  
});
const xdatapointsToUse = xAxisLabelsDate?.map((dateString) => {
  if (!dateString) {
    // Handle missing date string (optional)
    console.warn('Encountered a missing date string in xdatapoints.');
    return null; // Or return a default value if desired
  }
  const dateParts = dateString.split(' '); // Assuming format is "Month Day"
  const month = dateParts[0]; // Extract month
  const day = parseInt(dateParts[1], 10); // Extract and parse day

  // Assuming you have a function to convert month names to numerical values (replace with your actual logic)
  const monthNumber = convertMonthToNumber(month);

  if (!monthNumber) {
    // Handle invalid month name (optional)
    console.warn(`Invalid month name: ${month}`);
    return null; // Or return a default value if desired
  }

  return new Date(2024, monthNumber - 1, day).getTime(); // Convert to milliseconds since epoch (assuming year 2024)
});


const dateformat = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString();
}

  return (
    <>
    <StyledPaper sx={{ justifyContent: 'center' }}>
      
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",paddingBottom:'4px',marginBottom:'8px' }}>
        Welcome Back {userDisplayName}! 
        {/* <Typography>Check Your Progress on a  <br/> Specific  Excerise! </Typography> */}
      </Typography>
      <Stack direction="row" spacing={4}>
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
      <StyledBox1 onMouseEnter={handleHover}>
      
      <FlippingImage src={image6} alt="Fitness Image" style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }} />
      
      <FlippingImage src={image7} alt="Fitness Image" style={{ transform: `rotateY(${isFlipped ? 0 : 180}deg)` }} />
 
      </StyledBox1>
      </Stack>
    
    </StyledPaper>
    <ColumnPaper>

  
      <StyledBox3>
        <Box sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>
          Excersise Progression: <Typography sx={{fontSize:'10px',fontFamily: "Fjalla One"}}> {exerciseNames} </Typography> 
        </Typography>
        </Box>
        <Box  sx={{
          display: 'flex',
          
          flexDirection: 'row',
          alignItems: 'center',
       
          padding: '8px', // Use the desired padding value
          paddingTop: '20px',
        }} >
           
          <GraphBox  ydatapoints={weightDatapoints} xdatapoints={xdatapointsToUse}  valueformat={dateformat}  xAxialabel={'Date'} yAxislabel={'Weight (Ibs)'}/>
          
         
        <GraphBox ydatapoints={repsdatapoints}  xdatapoints={weightDatapoints}  xAxialabel={'Weight'} yAxislabel={'Reps'}/>
        <Stack direction="row" spacing={4}>
        <StyledBox1 onMouseEnter={handleHover}>
        <FlippingImage src={image8} alt="Fitness Image" style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }} />
        <FlippingImage src={image9} alt="Fitness Image" style={{ transform: `rotateY(${isFlipped ? 0 : 180}deg)` }} />
    
        </StyledBox1>
        </Stack>
        </Box>
            
      </StyledBox3>
    </ColumnPaper>


  </>
  )
}

