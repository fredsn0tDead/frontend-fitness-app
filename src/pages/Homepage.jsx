import React from 'react'
import {Paper, Typography, Button, Stack,Box,styled,Fade,Slide} from '@mui/material';
// import FitnessCenterIcon from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'

import { useState,useEffect } from 'react';
import { FitnessCarsouel } from '../Components/FitnessCarsouel';
const StyledHeader = styled(Paper)({
  
  width: '100%',
  padding: '8px', 
  color:'#000',
  textAlign: 'center',
  // marginTop: '40px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
   
})

const TextContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});


export const Homepage = () => {
  const navigate = useNavigate()
  const [fadeIn, setFadeIn] = useState(false);
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    // Timer for fadeIn (3 seconds delay)
    const fadeInTimer = setTimeout(() => {
      setFadeIn(true);
    }, 3000);
  
    // Timer for showText (1 second delay)
    const showTextTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);
  
    // Cleanup function to clear both timers
    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(showTextTimer);
    };
  }, []); // Em
  return (
    <>
  <Box
  sx={{ backgroundColor: '#000',
  color: '#fff',}}>
    <StyledHeader sx={{
      textAlign:'center',
      display: 'flex',
      justifyContent: 'center',
      marginBottom:'100px',
      position: 'relative', // Ensure positioning context for absolute positioning of text
      
      
      }}
      >
    <FitnessCarsouel />

        
        <TextContainer>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One" }}onClick={() => 
        { navigate('/')}}>
        {/* <FitnessCenterIcon  sx={{ mr:1 }} /> */}

          FitForm
        </Typography>
        </TextContainer>
    </StyledHeader>
    
    <Stack   sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Slide direction="left" in={showText} mountOnEnter unmountOnExit timeout={1000}>
          
          <Typography variant="h7" sx={{ fontSize: 20, fontFamily: 'Fjalla One' }}>
            Take Control of your
          </Typography>
        </Slide>
        <Slide direction="right" in={showText} mountOnEnter unmountOnExit timeout={1000}>
          
          <Typography variant="h2" sx={{ fontFamily: 'Fjalla One' }}>
            Fitness
          </Typography>
        </Slide>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30.2vh',
          gap: '20px',
        }}
      >
        <Fade in={fadeIn} timeout={3000}>
          
          <Button
            variant="contained"
            href="/login"
            sx={{
              fontSize: 20,
              fontFamily: 'Fjalla One',
              opacity: fadeIn ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            Already a member?
          </Button>
        </Fade>
        <Fade in={fadeIn} timeout={3000}>
          
          <Button
            variant="outlined"
            href="/signup"
            sx={{
              fontSize: 20,
              fontFamily: 'Fjalla One',
              // opacity: fadeIn ? 1 : 0,
              // transition: 'opacity 1s ease-in-out',
            }}
          >
            Join Now
          </Button>
        </Fade>
      </Box>
      
  </Box>
  <StyledHeader>
  <FitnessCarsouel/>
  </StyledHeader>
  
  </>
  )
}
