*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
}

:root {
  --primary: #6a59ff;
  --white: #FFFFFF	;
  --bg:#0080FE;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

@media (min-width: 1440px) {
  html {
    zoom: 1.5;
  }
}

@media (min-width: 2560px) {
  html {
    zoom: 1.7;
  }
}

@media (min-width: 3860px) {
  html {
    zoom: 2.5;
  }
}

@font-face {
  font-family: 'Cooper Hewitt';
  src: url('./fonts/CooperHewitt-Heavy.woff') format('woff');
  font-weight: 800; /* Heavy */
  font-style: normal;
}

@font-face {
  font-family: 'Cooper Hewitt';
  src:  url('./fonts/CooperHewitt-Thin.woff') format('woff');
  font-weight: 200; /* Thin */
  font-style: normal;
}
::-webkit-scrollbar {
  width: 1.3rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background: #797979;
  transition: all 0.5s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  background: #222224;
}

::-webkit-scrollbar-track {
  background: #f9f9f9;
}

body {
  font-size: 1.6rem;
  background: var(--white);
}

.container {
  max-width: 124rem;
 
  margin: 0 auto;
}

.heading {
  padding: 1rem 0;
  font-size: 3.5rem;
  font-weight: 400;
  text-align: center;
  font-family: 'Fjalla One';
  color:#000;
  

  
}

.heading span {

  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
}
.subheading{
  color:#000;
}
.subheading span{
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.swiper_container {
  height: 46rem;
  padding: 2rem 0;
  position: relative;
}
@media (max-width: 600px) {
  .heading span {
    font-size: 2rem; /* smaller font size */
    /* adjust line height to prevent overlap */
  }
  .container {
    padding: 0rem 1rem;
  }
}

.swiper-slide {
  width: 28rem !important;
  height: 36rem !important;
  position: relative;
}

@media (max-width: 500px) {
  .swiper_container {
    height: 46rem;
  }
  .swiper-slide {
    width: 28rem !important;
    height: 36rem !important;
  }
  .swiper-slide img {
    width: 28rem !important;
    height: 35rem !important;
  }
}

.swiper-slide img {
  width: 37rem;
  height: 42rem;
  border-radius: 2rem;
  object-fit: cover;
  border: 2px solid black;
  
}

.swiper-slide-shadow-left,
.swiper-slide-shadow-right {
  display: none;
}

.slider-controler {
  position: relative;
  bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-controler .swiper-button-next {
  left: 58% !important;
  transform: translateX(-58%) !important;
}

@media (max-width: 990px) {
  .slider-controler .swiper-button-next {
    left: 70% !important;
    transform: translateX(-70%) !important;
  }
}

@media (max-width: 450px) {
  .slider-controler .swiper-button-next {
    left: 80% !important;
    transform: translateX(-80%) !important;
  }
}

@media (max-width: 990px) {
  .slider-controler .swiper-button-prev {
    left: 30% !important;
    transform: translateX(-30%) !important;
  }
}

@media (max-width: 450px) {
  .slider-controler .swiper-button-prev {
    left: 20% !important;
    transform: translateX(-20%) !important;
  }
}

.slider-controler .slider-arrow {
  background: var(--blue);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  left: 42%;
  transform: translateX(-42%);
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.slider-controler .slider-arrow ion-icon {
  font-size: 2rem;
  color: #222224;
}

.slider-controler .slider-arrow::after {
  content: '';
}

.swiper-pagination {
  position: relative; 
  
  
  bottom: 1rem;
}

.swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));

}

.swiper-pagination .swiper-pagination-bullet-active {
  background: var(--primary);
}
.word {
  font-size: 3.5rem;
  text-align: center;
  margin: auto;
  color: white;
  font: 700 normal 2.5em 'tahoma';
  text-shadow: 5px 2px #222324, 2px 4px #222324, 3px 5px #222324;
}
.container-calendar{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem; 

}

.gif-card {
  cursor: pointer;
  overflow: hidden;
}

.gif-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  transition: filter 0.3s ease;
}

.gif-container {
  width: /* Width of your image */ ;
  height: /* Height of your image */ ;
}

.hidden-gif {
  display: none;
}

.gif-card:hover .hidden-gif {
  display: block;
}
.navbar {
  background-color: #fff; /* Adjust the color to match your design */
  height: 80px; /* Adjust the size as needed */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Your font-family here', sans-serif; /* Replace with your font */
  padding: 0 20px; /* Adjust the padding as needed */
  color:#42a5f5;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42a5f5; /* Adjust the color to match your design */
}

.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-item {
  margin: 0 15px; /* Adjust the margin as needed */
  font-size: 1rem;
  color: #42a5f5; /* Adjust the color to match your design */
  cursor: pointer;
}

.login-button {
  border: none;
  background-color: #000; /* Adjust the color to match your design */
  color: #fff; /* Adjust the color to match your design */
  padding: 10px 20px; /* Adjust the padding as needed */
  cursor: pointer;
  border-radius: 5px; /* Adjust the border-radius as needed */
}

/* Add responsive design and other styles as needed */
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
    <ListItem key="Current Workout" disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <UploadIcon />
        </ListItemIcon>
        <ListItemText primary="Current Workout" />
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