import React from 'react'
import { useState,useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { getAuth, onAuthStateChanged,onIdTokenChanged  } from 'firebase/auth'; 
import { WorkoutLog_Card } from './WorkoutLog';
import {styled} from '@mui/system';
import  calendarTheme  from './CalendarTheme';  
import { ThemeProvider } from '@mui/system';
import axios from 'axios';
const StyledContainer = styled('div')`
  text-align: center;
  margin: 20px;
  animation: slideInOut 0.5s ease-out;
  background: '#8e44ad'; // Add slide-in/out animation
`;
const colors = {
  primary: '#1976D2', // For example, a nice blue
  primaryLight: '#42a5f5',
  secondary: '#F50057', // For accents
  surface: '#ffffff', // For card-like surfaces
  onSurface: '#333333', // Text on the surface
  // ... include other colors as needed
};

const CalendarHeader = styled('h1')`
  background-color: ${calendarTheme.palette.primary.main};
  color: white;
  padding: 10px;
  font-size: 24px;
  
`;
const Styledheader = styled('p')`
  font-family: 'Fjalla One';
  color: #FFF;
  margin: 0;
  padding: 20px;
  background-color: #8e44ad;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: slideInOut 0.5s ease-out;
  `;


const CalendarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const StyledCalendar = styled(Calendar)`
  && {
    font-family: 'Roboto', sans-serif;
    background-color: ${colors.surface};
    color: ${colors.onSurface};
    box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06);
    border-radius: 10px;
    padding: 20px;
    border: none;
    width: 300px; // Set width to 300 pixels
    height: 300px; // Set height to 300 pixels
    /* Additional styling to ensure content fits well in the new size */
    .react-calendar {
      max-width: 100%;
      height: 100%;
    }

    .react-calendar__tile {
      border-radius: 10px;
      font-family: 'Roboto', sans-serif;
      &:hover {
        background-color: ${colors.primaryLight};
      }
    }

    .react-calendar__tile--active {
      background-color: ${colors.primary};
      color: ${colors.surface};
    }

    .react-calendar__tile--now {
      background-color: ${colors.secondary};
      color: ${colors.surface};
    }

    .react-calendar__navigation button {
      background-color: transparent;
      color: ${colors.onSurface};
      border: none;
      font-family: 'Roboto', sans-serif;
      &:hover {
        background-color: ${colors.primaryLight};
      }
    }

    .react-calendar__navigation button:disabled {
      background-color: transparent;
      color: ${colors.onSurface}66;
    }
  }
`;
// Custom styles for the react-calendar component
// const StyledCalendar = styled(Calendar)`
//   && {
//     background-color: ${calendarTheme.palette.background.default};
//     color: ${calendarTheme.palette.text.primary};
//     border: 1px solid ${calendarTheme.palette.secondary.main}; /* Set border color */
//     border-radius: 30px; /* Add a 30px border radius */
//     opacity: 0;
//     animation: fadeIn 1s ease-out forwards;
//     font-family: 'Fjalla One';

//     @keyframes fadeIn {
//       from {
//         opacity: 0;
//       }
//       to {
//         opacity: 1;
//       }
//     }
  
//     .react-calendar__tile {
//       color: white; /* Set text color to white */
//       border-radius: 0; /* Remove default border radius */
//       border-radius: 30px;
//       font-family: 'Fjalla One';
//     }

//     .react-calendar__tile--active {
//       background-color: ${calendarTheme.palette.secondary.main};
//       color: white;
//       border-radius: 30px;
//     }

//     .react-calendar__tile--now {
//       color: #FFFF;
//       background-color: #666; /* Set very light blue background color */
//       border-radius: 30px; /* Adjust border radius for the current day */
//     }
//     .react-calendar__tile--hover {
//       background-color: ${calendarTheme.palette.secondary.light}; /* Set light blue background color for hover state */
//     }
//     .react-calendar__navigation button {
//       background-color: ${calendarTheme.palette.secondary.main};
//       color: white;
//       border: none;
//       padding: 5px 10px;
//       cursor: pointer;
//       border-radius: 30px;
//     }
    
//     .react-calendar__navigation button:disabled {
//       background-color: #ddd;
//       color: #666;
//       cursor: not-allowed;
//     }
//   }
// `;

const WorkoutContainer = styled('div')`
  margin-top: 20px;
`;

const slideInOutAnimation = {
  '0%': {
    transform: 'translateY(-100%)', // Start position above the viewport
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)', // End position at normal position
    opacity: 1,
  },
};

const StyledWorkoutLog_Card = styled(WorkoutLog_Card)`
  animation: slideInOut 0.5s ease-out; // Add slide-in/out animation
  
`;

export const PreviousWorkouts = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [workoutData, setWorkoutData] = useState(null);
    const location = useLocation();
    const {displayName, email, uid} =  location.state || {};
    const [user, setUser] = useState(null);
    console.log('Exercise Log component rendering...');
     console.log('User info:', displayName, email, uid);
     
    


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

    const handleDateChange = async (newDate) => {
         formatDate(newDate);
        setSelectedDate(newDate);
      await fetchWorkoutData(newDate);
      };
      const fetchWorkoutData = async (date) => {
        const formattedDate = formatDate(date);
        console.log('Fetching workout data for', formattedDate);
        if (user && uid) {
        try {
          
          const idToken = await user.getIdToken(false);
          console.log(idToken)
          const response = await fetch(`http://127.0.0.1:5000/get-workout?date=${formattedDate}`, {
            headers: {
              Authorization: `${idToken}`,
            },
          });
          if (response.ok) {
          const data = await response.json();
          setWorkoutData(data);
          console.log(data);
          }
          else{
            console.log('Error fetching workout data:', response.status);
            setWorkoutData(null);
          }
          
        } catch (error) {
          console.error('Error fetching workout data:', error);
          setSelectedDate(null);
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
  const handleDelete = async (entryId) => {
    try {
        // Make a DELETE request to the Flask backend
        await axios.delete(`http://127.0.0.1:5000/delete_exercise_data/${entryId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${await user.getIdToken(false)}`,
            },
        });

        // Optionally, update the state or perform any other necessary actions
        console.log('Exercise data deleted successfully!');
    } catch (error) {
        console.error('Error deleting exercise data:', error);
    }
};

 
  return (
    <StyledContainer onAnimationEnd={() => console.log('Animation ended')}>
      
      <CalendarContainer>
        <StyledCalendar onChange={handleDateChange} value={selectedDate} />
        <WorkoutContainer>
          {workoutData !== null ? (
            <StyledWorkoutLog_Card workoutdata={workoutData} selecteddate={selectedDate} onDelete={handleDelete}/>
          ) : (
            <Styledheader>You have not entered any workouts on this day</Styledheader>
          )}
        </WorkoutContainer>
      </CalendarContainer>
    </StyledContainer>
  );
};
