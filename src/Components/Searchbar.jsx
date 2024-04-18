import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { maxWidth } from '@mui/system';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '80%',
  padding: '2px 4px',
  margin: 'auto',
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: '8px',

}));

const SearchIconButton = styled(IconButton)({
  marginRight: '8px',
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: '8px',
  flex: 1,
}));

const UserAvatar = styled(Avatar)({
  marginLeft: '16px',
  // Add any additional styling you may need for the avatar here
});


export const Searchbar = ({Image}) => {
  const location = useLocation();
  const  {displayName, email, uid} =  location.state || {};
  const [userDisplayName, setUserDisplayName] = useState(
    localStorage.getItem('userDisplayName') || displayName || ''
  );
 
 
  
  return (
    <SearchBox>
      <SearchIconButton aria-label="search">
        <SearchIcon />
      </SearchIconButton>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'end' }}>
        
      </Typography>
      <UserAvatar alt="User Avatar" src={Image} />
      
      {/* Replace "/path-to-user-avatar.jpg" with the actual path to your user's avatar image */}
    </SearchBox>

  )
}
