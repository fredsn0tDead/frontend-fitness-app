import React from 'react'
import { Box } from '@mui/system'
import {styled} from '@mui/system';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {useNavigate} from 'react-router-dom'
import MovingComponent from 'react-moving-text'
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 3000); // 3 second delay before fading in

    return () => clearTimeout(timer);
  }, []);

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
      textAlign: 'center',
      marginBottom: '100px',
      }}
      >
    <FitnessCarsouel />

        
        <TextContainer>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One" }}onClick={() => 
        { navigate('/')}}>
        <FitnessCenterIcon  sx={{ mr:1 }} />

          FitForm
        </Typography>
        </TextContainer>
    </StyledHeader>
    
    <Stack   sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <MovingComponent
          type="fadeInFromLeft"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <Typography variant="h7" sx={{ fontSize: 20, fontFamily: 'Fjalla One' }}>
            Take Control of your
          </Typography>
        </MovingComponent>
        <MovingComponent
          type="fadeInFromRight"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <Typography variant="h2" sx={{ fontFamily: 'Fjalla One' }}>
            Fitness
          </Typography>
        </MovingComponent>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          gap: '20px',
        }}
      >
        <MovingComponent
          type="fadeIn"
          duration="1000ms"
          delay="1s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
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
        </MovingComponent>
        <MovingComponent
          type="fadeIn"
          duration="1000ms"
          delay="1s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <Button
            variant="outlined"
            href="/signup"
            sx={{
              fontSize: 20,
              fontFamily: 'Fjalla One',
              opacity: fadeIn ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            Join Now
          </Button>
        </MovingComponent>
      </Box>
      
  </Box>
  <StyledHeader>
  <FitnessCarsouel/>
  </StyledHeader>
  
  </>
  )
}
