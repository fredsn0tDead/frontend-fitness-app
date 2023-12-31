import React from 'react'
import { Container, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export const SignOut = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '100px' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: '5rem', color: 'green' }} />
          <Typography variant="h4" component="h1" mt={2}>
            Successfully signed out
          </Typography>
          <Typography variant="body1" mt={2}>
            You have been successfully signed out.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/"
            sx={{ marginTop: '20px' }}
          >
            Back to Home
          </Button>
        </Container>
      )
}
