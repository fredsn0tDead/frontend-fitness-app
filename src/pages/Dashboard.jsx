import React from 'react'
import{styled} from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { ExcersiseLog } from '../Components/ExcersiseLog';
import { Box,createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import IMG1 from '../Assets/pexels-zakaria-boumliha-2827392.jpg'
import IMG2 from '../Assets/pexels-leon-ardho-1552249.jpg'
import IMG3 from '../Assets/pexels-koolshooters-7346634.jpg'
import { ER_Card } from '../Components/ER_Card';
import { VideoBackground } from '../Components/VideoBackground';
import videoSource from '../Assets/VideoBackground.mp4'
const RootContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '10vh',
    padding: '8px', // Use the desired padding value
  });
  

  const ActionButtonsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px', // Use the desired margin value
    '& > div': {
      marginRight: '16px', // Add space between the ER_Card components
      flex: '1', // Ensure each ER_Card takes equal space
    },
    width: '700px', // Set the desired width
    height: '600px',
  });
 
  // used to search for older workouts create a new workout and view your progress
  //should be able to output a graph of your progress
  
export const Dashboard = () => {
    // const location = useLocation();
  // const { displayName, email, uid } = location.state || {};
  const location = useLocation();
  const navigate = useNavigate();
  const  {displayName, email, uid} =  location.state || {};
  console.log('Dashboard component rendering...');
  console.log('User info:', displayName, email, uid);

  // Time out feature for the popup
  const SmallerERCard = styled(ER_Card)({
    // Add your styles to make the card smaller
    width: '150px', // Set the desired width
    height: '200px', // Set the desired height
  });
  return (
    <>
  
  <VideoBackground>
        <video autoPlay muted loop>
          <source src={videoSource} type="video/mp4" autoPlay loop muted  />
          Your browser does not support the video tag.
        </video>
      </VideoBackground>
      
    {/* <Typography variant='h1' component='h1' style={{textAlign:'center', fontSize:'40px',fontWeight:'bold'}}>
      Welcome Back {displayName}!<br/>
      How can we help you today?
      </Typography>
       */}



    <RootContainer>
    
      
      
      <ActionButtonsContainer>
        <SmallerERCard title='Excerise Recommendations' image={IMG3} description='Pick excerises that work best with your build'
        onClick={() => {
          navigate('/recommender', { state: { displayName, email, uid } });
        }}/>

        
        
        <SmallerERCard title='Excersise Log' image={IMG3} description='Keep Track of your progress'
       onClick={() => {
        navigate('/exercise-log', { state: { displayName, email, uid } });
      }}
    /> 
        <SmallerERCard title='Previous Work Outs' image={IMG3} description='Reflect Back on your progress'
       onClick={() => {
        navigate('/previous-workouts', { state: { displayName, email, uid } });
      }}/>
        
     
      </ActionButtonsContainer>
   
  </RootContainer>
  </>
  )
}
