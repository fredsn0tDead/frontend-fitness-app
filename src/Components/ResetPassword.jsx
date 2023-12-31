import React from 'react'
import { Avatar } from '@mui/material'
import { useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { auth } from './firebase';
import { confirmPasswordReset } from 'firebase/auth';
const defaultTheme = createTheme();
export const ResetPassword = () => {
    const navigate = useNavigate();
    const { oobCode } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    console.log(oobCode);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword)  {
                await confirmPasswordReset(auth,oobCode, password);
                console.log('Password reset successful');
                navigate('/ResetConfirmation');

            }
            else {
                console.error('Passwords do not match');
            }
        }
        catch(error) {
            console.error('Error resetting password', error);
        }
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
              Reset Your Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="new-password"
                autoComplete="New Password"
                autoFocus
                onChange={(e)=>setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmpassword"
                label="Confirm Password"
                name="confirm-password"
                autoComplete="Confirm Password"
                autoFocus
                onChange={(e)=>setConfirmPassword(e.target.value)}
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
          </Box>
    
        </Container>
      </ThemeProvider>
  )
}
