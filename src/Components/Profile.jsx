import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Profile = () => {
    const [displayName, setDisplayName] = useState(auth.currentUser.displayName);
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the display name
            await updateProfile(auth.currentUser, { displayName });
            // Update the profile picture if provided
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
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Edit Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Display Name"
                        variant="outlined"
                        value={displayName}
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