import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState,useEffect, } from 'react';
import { Profile } from './Profile';
import { SideBar } from './SideBar';

export const Nav = ({isLoggedIn, onSignOut,toggleProfile,showProfile}) => {
    const location = useLocation();
    const  {displayName,} =  location.state || {};
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
    if (isLoggedIn) {
      return (
        <>
          <SideBar onSignOut={onSignOut} toggleProfile={toggleProfile} showProfile={showProfile} />
          {showProfile && <Profile showProfile={showProfile} toggleProfile={toggleProfile} onDisplayNameUpdate={handleDisplayNameUpdate} />}
        </>
      );
    }
  
    return (

      <>
      </>
  // <StyledContainer
  // >
  //   <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{fontSize:20}}>
  //     <Box sx={{ display: 'flex', alignItems: 'center' ,marginLeft:15}}>
  //       <FitnessCenterIcon  sx={{ mr:3 }} />
  //       <Typography variant="h7" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One" }}>
  //         FORMFIT 
  //       </Typography>
  //     </Box>
  //     <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 ,fontSize:20, marginRight:20}}>
       
  //           <Button color="inherit"  component={Link} to="/" sx={{  margin: '0 8px', fontFamily: "Fjalla One" ,fontSize:20}}>Home</Button>
  //           <Button color="inherit"  component={Link} to="/signup" sx={{  margin: '0 8px', fontFamily: "Fjalla One",fontSize:20 }}>Sign Up</Button>
  //           <Button color="inherit" variant='outlined' component={Link} to="/login" sx={{  margin: '0 8px', fontFamily: "Fjalla One",fontSize:20 }}>Log in</Button>
          
        
  //     </Box>
  //   </Stack>
  //   {showProfile && <Profile showProfile={showProfile} toggleProfile={toggleProfile} onDisplayNameUpdate={handleDisplayNameUpdate} />} 
  // </StyledContainer>
)

  
    
}
