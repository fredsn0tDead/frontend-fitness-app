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

export const Profile = ({ onDisplayNameUpdate,showProfile,toggleProfile }) => {
    const [newDisplayName, setNewDisplayName] = useState(auth.currentUser.displayName || "");
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);

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
            onDisplayNameUpdate(newDisplayName);
            // Update the profile picture if provided
            toggleProfile()
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
    
    return (
<Card
            sx={{
                position: 'fixed',
                right: -15,
                top: 50,
                width: '300px',
                margin: '20px',
                zIndex: 1000, // Adjust the z-index value as needed

                // Media queries for responsiveness
                '@media (max-width: 600px)': {
                    width: '40%', // Adjust the width for smaller screens
                    right: 0, // Adjust the positioning for smaller screens
                    margin: '10px', // Adjust the margin for smaller screens
                    right:115,
                },
                '@media (min-width: 600px) and (max-width: 960px)': {
                    width: '60%', // Adjust the width for medium screens
                },
            }}
        >            <CardContent>
                <Typography variant="h5" component="h2">
                    Edit Profile
                </Typography>
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
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </form>
                {error && <Typography color="error">{error}</Typography>}
            </CardContent>
        </Card>
    );
};
