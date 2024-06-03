import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import {Avatar, Grid, Paper} from '@mui/material';
import { display } from '@mui/system';
import { styled } from '@mui/system';
import { PreviousWorkouts } from './PreviousWorkouts';
import { useContext } from 'react'; 
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import {firestore } from '../Components/firebase';
import MeasurementsContext from './MeasurementsContext';
const ProfileContariner = styled(Paper)({
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    color: '#000',
    position: 'fixed',
    right: -15,
    width: '300px',
    margin: '20px',
    zIndex: 1000,
    overflow: 'hidden',
})   
const Styledbox = styled(Paper)({ 
    width: '300px',
    elevation: 0,
    padding: '16px',
    color: '#000',
    textAlign: 'center',
    

})
export const Profile = ({ onDisplayNameUpdate,showProfile,toggleProfile }) => {
    const [newDisplayName, setNewDisplayName] = useState(auth.currentUser.displayName || "");
    const [profilePicture, setProfilePicture] = useState(null);
    const [displayweight, setDisplayweight] = useState(0);
    const [displayleg, setDisplayleg] = useState(0);
    const [displaytorso, setDisplaytorso] = useState(0);
    const [displayarm, setDisplayarm] = useState(0);
    const [error, setError] = useState(null);
    const { measurements, updateMeasurements } = useContext(MeasurementsContext);

    const handleDisplayNameChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };
    useEffect(() => {
        if (auth.currentUser) {
          setNewDisplayName(auth.currentUser.displayName || "");
        }
      },[]);
      useEffect(() => {
        const fetchData = async () => {
          if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userRef = doc(firestore, 'users', userId);
            const userSnap = await getDoc(userRef);
     
            console.log('User data exists:', userSnap.exists());
            console.log('User data:', userSnap.data());
            if (userSnap.exists()) {
              const userData = userSnap.data();
              console.log('User data:', userData.weight, userData.legLength, userData.torsoLength, userData.armLength);
              setDisplayweight(userData.weight);
              setDisplayleg(userData.legLength);
                setDisplaytorso(userData.torsoLength);
                setDisplayarm(userData.armLength);
              console.log(userData.weight)
              console.log(userData.legLength)
              console.log(userData.torsoLength)
              console.log(userData.armLength)
              
            } else {
              console.log('No user data found');
            }
          }
        };
      
        fetchData();
      },[]); 
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Update the display name
    //             await updateProfile(auth.currentUser, { displayName: newDisplayName });
    //         // Update the local state with the new displayName
    //         onDisplayNameUpdate(newDisplayName);
    //         // Update the profile picture if provided
    //         toggleProfile()
    //         if (profilePicture) {
    //             // Logic to upload the profile picture to storage and update the user's profile
    //             // Replace this with your actual logic
    //             console.log('Uploading profile picture...', profilePicture);
    //         }
    //         setError(null);
    //     } catch (error) {
    //         setError('Error updating profile: ' + error.message);
    //     }
       
    // };
    
    return (
        <ProfileContariner>
            <Avatar></Avatar>
            <Typography variant="h5" component="div" sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>    
            {newDisplayName}
            </Typography>
            <Typography variant='h7' component='div'sx={{ fontFamily: "Fjalla One", textAlign:'center'}} >#{newDisplayName.toLowerCase()}</Typography>
         
                <Grid container spacing={2} flexDirection='row' wrap='false'pt={2} pb={2}>
                    <Grid item xs={6}>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>Weight </Typography>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>{displayweight}kg</Typography>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>Arm </Typography>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>{displayarm}cm</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>Torso </Typography>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>{displaytorso}cm</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>Legs</Typography>
                        <Typography variant='h7' component='div' sx={{ fontFamily: "Fjalla One", textAlign:'center'}}>{displayleg}cm</Typography>
                    </Grid>
                </Grid>
                
            
            
            <Styledbox>
           
            </Styledbox>
                
         
           
        </ProfileContariner>
    );
};
