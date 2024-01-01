import React from 'react'
import { useState,useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { getAuth, onAuthStateChanged,onIdTokenChanged  } from 'firebase/auth'; 
import { WorkoutLog_Card } from './WorkoutLog';
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

  return (
    <div className='container-calendar'>
    <h1>Workout Calendar</h1>
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={selectedDate} />



      {/* Conditional rendering of WorkoutLog_Card */}
      {workoutData !== null ? (
  <WorkoutLog_Card workoutdata={workoutData} selecteddate={selectedDate} />
   
) : (
  <p>No workout entered on this day</p>
)}
    </div>
  </div>
  )
}
