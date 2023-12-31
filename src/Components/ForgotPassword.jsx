import React from 'react'
import { Avatar } from '@mui/material'
import { useState ,useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {  sendPasswordResetEmail   } from 'firebase/auth';

const defaultTheme = createTheme();


export const ForgotPassword = () => {
    const [email, setEmail] = useState(''); 
    const [resetPassword, setResetPassword] = useState(false);
    const navigate = useNavigate();
    
    // useEffect(() => {
    //   const isReset = localStorage.getItem('resetPassword');
    //   if (is === 'true') {
    //       localStorage.setItem('resetPassword', 'false');  }
    // }, []);
    
    
     const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
          await sendPasswordResetEmail(auth, email);
          console.log('Password reset email sent');
          // Store in localStoragex`
    
          
        }
        catch(error){
          console.error('Error sending password reset email', error);
    
        }
        navigate('/ForgotPasswordConfirmation')
      };
        
      return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            {resetPassword || localStorage.getItem('resetPassword') === 'true' ? (
              <Typography variant="body1">
              If a valid email is associated with this account, a reset link has been sent.
            </Typography>
            ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>setEmail(e.target.value)}
              />
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              
            </Box>
            ) }
          
          </Box>
    
        </Container>
      </ThemeProvider>
      )
}
