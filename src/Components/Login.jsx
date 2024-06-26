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
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const defaultTheme = createTheme();

export const Login = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage snackbar visibility

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const { displayName, email, uid } = userCredential.user;
            navigate("/dashboard", { state: {  displayName, email, uid } });
            onLogin({ displayName, email, uid });
            console.log(displayName, email, uid );
            setError(null);
        })
        .catch((error) => {
            setSnackbarOpen(true);
            setError('Invalid username or password.');
            console.error('Error signing in:', error);
        });
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
          Sign in
        </Typography>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,backgroundColor: '#000', color: '#FFF'}}
          >
            Sign In
          </Button>
          {error && <p>{error}</p>}
          <Grid container>
            <Grid item xs>
              <NavLink to="/forgotpassword" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
            {"Don't have an account? "}
              <NavLink to="/signup" variant="body2">
                Sign up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
  </ThemeProvider>
  );
}
