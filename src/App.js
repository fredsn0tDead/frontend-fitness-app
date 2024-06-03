  import { Route, Routes } from 'react-router-dom';
  import { useState,useEffect } from 'react';
  import { ExcersiseLog } from './Components/ExcersiseLog.jsx';
  import React from 'react';
  import { ProgramPlan } from './Components/ProgramPlan.jsx';
  import { Homepage } from './pages/Homepage.jsx';
  import { Nav } from './Components/Nav.jsx';
  import { Login } from './Components/Login.jsx';
  import { Signup } from './Components/Signup.jsx';
  import { SignOut } from './Components/SignOut.jsx';
  import { PreviousWorkouts } from './Components/PreviousWorkouts.jsx';
  import { Dashboard } from './pages/Dashboard.jsx';
  import { ForgotPassword } from './Components/ForgotPassword.jsx';
  import { ResetPassword } from './Components/ResetPassword.jsx';
  import { Recommender } from './Components/Recommender.jsx';
  import { ExcersiseSearch } from './pages/ExcersiseSearch.jsx';
  import { CreateWorkout } from './pages/CreateWorkout.jsx';
  import { MeasurementsProvider } from './Components/MeasurementsContext.jsx';
  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
      // Check local storage for user authentication state upon app initialization
      const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
      if (storedLoggedInStatus) {
        setIsLoggedIn(JSON.parse(storedLoggedInStatus));
      }
    }, []);

    const handleLogin = (loggedIn) => {
      setIsLoggedIn(loggedIn);
      // Store user's logged-in status in local storage upon successful login
      localStorage.setItem('isLoggedIn', true);
      
    };
    const handleSignOut = () => {
      // Handle sign out logic here
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    };
    const toggleProfile = () => {
      setShowProfile(!showProfile);
      console.log(showProfile)
    };

    return (
      <MeasurementsProvider >
       <Nav isLoggedIn={isLoggedIn} onSignOut={handleSignOut} toggleProfile={toggleProfile} showProfile={showProfile}/> 

      <Routes>
      <Route  path="/" element={<Homepage/> }/>
      <Route  path="/ProgramPlan" element={<ProgramPlan/> }/>
      <Route exact path="/exercise-log" element= {<ExcersiseLog/>}/>
      <Route exact path="/login" element= {<Login onLogin={handleLogin}/>}/> 
        <Route exact path="/signup" element= {<Signup/>}/>
        <Route exact path="/signout" element= {<SignOut/>}/>
        <Route exact path ="/previous-workouts" element={<PreviousWorkouts/>}/>
        <Route exact path='/dashboard' element={<Dashboard showProfile={showProfile} toggleProfile={toggleProfile} />} />
        <Route exact path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route exact path='/resetpassword' element={<ResetPassword/>}/>
        <Route exact path='/recommender' element={<Recommender/>}/>
        <Route exact path="/ExcersiseSearch" element={<ExcersiseSearch/>} />
        <Route exact path="/CreateWorkout" element={<CreateWorkout/>} />
        </Routes>
      </MeasurementsProvider>
    );
  }

  export default App;
