import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadIcon from '@mui/icons-material/Upload';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useState,useEffect } from 'react';
import { useNavigate,useLocation,Link } from 'react-router-dom';
import { styled, } from '@mui/material/styles';
import { Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Stack } from '@mui/system';


const drawerWidth = 170;
export const SideBar = ({onSignOut,toggleProfile,showProfile}) => {

    const location = useLocation();
    const  {displayName, email, uid} =  location.state || {};
    const navigate = useNavigate();
    
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
    const DrawerList = (
        <Box sx={{ 
          width: { xs: 50, sm: drawerWidth } 
        ,paddingTop:5,
         }} role="presentation">
          <Stack direction="row" justifyContent="flex-start" spacing={5} alignItems="center"sx={{paddingLeft:2}}>
          <FitnessCenterIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Fjalla One" }}>
            FITFORM
          </Typography>
          </Stack>
        <List>
          {/* Update ListItemButton onClick to use handleNavigation with the correct path */}
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={() => navigate('/dashboard', { state: { displayName, email, uid } })}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Calandar" disablePadding>
          <ListItemButton  
            onClick={() => navigate('/previous-workouts', { state: { displayName, email, uid } })}>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Workout Builder" disablePadding>
            <ListItemButton  onClick={() => {
            navigate('/recommender', { state: { displayName, email, uid } });
          }}>
              <ListItemIcon>
                <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary="Workout Builder" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Workout Log" disablePadding>
            <ListItemButton onClick={() => {
            navigate('/exercise-log', { state: { displayName, email, uid } })
          }}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Workout Log" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Exercise Variation" disablePadding>
            <ListItemButton onClick={() => {
            navigate('/ExcersiseSearch', { state: { displayName, email, uid } })
          }}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Excersise Variation" />
            </ListItemButton>
          </ListItem>
          
          {/* ... other list items ... */}
        </List>
        <Divider />
        <List>
          <ListItem key="Create Workout" disablePadding onClick={() => {
            navigate('/CreateWorkout', { state: { displayName, email, uid } })
          }}>
            <ListItemButton>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding>
            <ListItemButton  onClick={toggleProfile} >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={onSignOut} component={Link} to="/signout">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          {/* ... other list items ... */}
        </List>
      </Box>
      );
    return (
    <div>
       
       <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'absolute', // This makes the drawer float over the content
          zIndex: (theme) => theme.zIndex.drawer + 2, // Ensure the drawer is above main content
        },
      }}
      variant="permanent"
      anchor="left
      "
    >
        {DrawerList}
      </Drawer>
    </div>
  )
}
