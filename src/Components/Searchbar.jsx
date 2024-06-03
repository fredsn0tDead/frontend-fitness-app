import React from 'react'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import Avatar from '@mui/material/Avatar';
import { TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {Autocomplete} from '@mui/material';
const excerNames = require('./exercise_names_C.json');
const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '2px 4px',
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  

}));

const SearchIconButton = styled(IconButton)({
  marginRight: '8px',
});

const StyledInputBase = styled(TextField)(({ theme }) => ({
  marginLeft: '8px',
  flex: 1,
  width: '700%',
}));

const UserAvatar = styled(Avatar)({
  marginLeft: '16px',
  // Add any additional styling you may need for the avatar here
});


export const Searchbar = ({Image,handleSearch}) => {
  const location = useLocation();
  const  {displayName, email, uid} =  location.state || {};
  const [userDisplayName, setUserDisplayName] = useState(
    localStorage.getItem('userDisplayName') || displayName || ''
  );
  const [exerciseNames, setExerciseNames] = useState(excerNames);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleChange = (event, newValue) => {
    const normalizedValue = newValue?.toUpperCase(); // Ensure case-insensitive match
    setInputValue(normalizedValue);
    setInputError(!exerciseNames.excerNames.includes(normalizedValue));
    if (!inputError) {
      handleSearch(normalizedValue); 
    }
  };

 
  
  return (
    <SearchBox>
     <SearchIconButton aria-label="search">
        <SearchIcon />
      </SearchIconButton>
      
  <Autocomplete
  
    freeSolo 
    options={exerciseNames.excerNames.map(name => name.toUpperCase())}
    variant="outlined"
    autoHighlight  
    value={inputValue} 
    
    onChange={handleChange}
    renderInput={(params) => (
      //  Note: We now spread the params directly into StyledInputBase
      <StyledInputBase {...params}
      
      placeholder='Search for excersise...' /> 
    )}
  />
      
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One",textAlign:'end' }}>
      
      </Typography>
      <UserAvatar alt="User Avatar" src={Image} alignItems='end' />
      
       
    </SearchBox>

  )
}
