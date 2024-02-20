import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Button} from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Profile } from './Profile';
export const Nav = ({isLoggedIn, onSignOut,toggleProfile,showProfile}) => {
    const location = useLocation();
    const  {displayName, email, uid} =  location.state || {};
    const navigate = useNavigate();
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
      <AppBar position="static" >
          <Toolbar>
              <FitnessCenterIcon sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,fontFamily: "Fjalla One"}}>
              FORMFIT 
              </Typography>
              {isLoggedIn ? (
              <>
              <Button color="inherit" onClick={onSignOut}component={Link} to="/signout" >
  
              Sign Out
            </Button>
            <Button color="inherit"  onClick={() => {
              navigate('/dashboard', { state: { displayName, email, uid } });
            }}>Dashboard</Button>
            <Button color="inherit" onClick={toggleProfile}>Edit Profile</Button>

            </>
              ) : (
                <>
              <Button color="inherit" component={Link} to="/">Home</Button>
       
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
              <Button color="inherit" component={Link} to="/login">Log in</Button>
              </>
              )}
          </Toolbar>
          
      </AppBar>
      {showProfile && <Profile showProfile={showProfile} toggleProfile={toggleProfile} onDisplayNameUpdate={handleDisplayNameUpdate} />}

      </>
  
    )
}
