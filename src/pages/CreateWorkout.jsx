import React from 'react'
import { Box } from '@mui/system'
import {styled} from '@mui/system';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../Components/firebase';
import {TextField,Button} from '@mui/material';
import MeasurementsContext from '../Components/MeasurementsContext';
import { useContext } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import {firestore } from '../Components/firebase';

const StyledHeader = styled('div')({
  
  padding: '8px', 
  color:'#000',
  textAlign: 'center',
  // marginTop: '40px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '3rem',
})
const Container = styled(Paper)({
    marginLeft:'250px',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    color: '#000',
    position: 'fixed',




});

export const CreateWorkout = () => {
const location = useLocation();
  const  {displayName, email, uid} =  location.state || {};
  const { measurements, updateMeasurements } = useContext(MeasurementsContext);
  


  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  
  const [newDisplayName, setNewDisplayName] = useState(
    auth.currentUser ? auth.currentUser.displayName || "" : ""
  );
    const [userDisplayName, setUserDisplayName] = useState(
    localStorage.getItem('userDisplayName') || displayName || ''
  );
  useEffect(() => {
    localStorage.setItem('userDisplayName', userDisplayName);
    console.log('auth.currentUser', auth.currentUser)
  }, [userDisplayName]);

  const [displayweight, setDisplayweight] = useState(0);
  const [displayleg, setDisplayleg] = useState(0);
  const [displaytorso, setDisplaytorso] = useState(0);
  const [displayarm, setDisplayarm] = useState(0);
  

  const handleDisplayNameUpdate = (newDisplayName) => {
    setUserDisplayName(newDisplayName);
    console.log('New display name:', newDisplayName);
  };
  const handleDisplayNameChange = (e) => {
    setNewDisplayName(e.target.value);
};

const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Update the display name
            await updateProfile(auth.currentUser, { displayName: newDisplayName });
        // Update the local state with the new displayName
        handleDisplayNameUpdate(newDisplayName);
        // Update the profile picture if provided
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userRef = doc(firestore, 'users', userId);
      
            await setDoc(userRef, {
                weight: measurements.weight,
                legLength: measurements.legLength,
                torsoLength: measurements.torsoLength,
                armLength: measurements.armLength
            }, { merge: true }); // 'merge' prevents overwriting
      
            console.log('Measurements updated successfully!'); 
          } 
        if (profilePicture) {
            // Logic to upload the profile picture to storage and update the user's profile
            // Replace this with your actual logic
            console.log('Uploading profile picture...', profilePicture);
        }
        setError(null);
    } catch (error) {
        setError('Error updating profile: ' + error.message);
    }
   
};
// const handleMeasurementsChange = (updateField, value) => {
//   console.log('Current measurements state:', measurements); // Check the current state
//    console.log('Update field:', updateField);
//    console.log('New value:', value); 

//    setMeasurements({ ...measurements, [updateField]: value });
// };

  return (
    <MeasurementsContext.Provider value={{ ...measurements, updateMeasurements }}>
    <Container>
        <StyledHeader> Profile </StyledHeader>
        <Avatar></Avatar>
        <Typography variant="h6">{newDisplayName}</Typography>
        <form onSubmit={handleSubmit}>
    
                    <TextField
                        label="Display Name"
                        variant="outlined"
                        value={newDisplayName}
                        onChange={handleDisplayNameChange}
                        fullWidth
                        margin="normal"
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-picture-input"
                        type="file"
                        onChange={handleProfilePictureChange}
                    />
                    <TextField
                        label="Current Weight"
                        variant="outlined"
                        value={measurements ? measurements.weight : 0}
                        onChange={(e) => updateMeasurements('weight', e.target.value)} 

                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Current Leg Length"
                        variant="outlined"
                        value={measurements ? measurements.legLength : 0}
                        onChange={(e)=>updateMeasurements('legLength', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Current Torso Length"
                        variant="outlined"
                        value={measurements ? measurements.torsoLength : 0}
                        onChange={(e)=>updateMeasurements('torsoLength', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Current Arm Length"
                        variant="outlined"
                        value={measurements ? measurements.armLength : 0}
                        onChange={(e)=>updateMeasurements('armLength', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </form>




      
    </Container>
    </MeasurementsContext.Provider>
    

  )
}

