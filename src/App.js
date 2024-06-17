import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { ExcersiseLog } from './Components/ExcersiseLog.jsx';
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

  const logoutTimeoutRef = useRef(null);
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To get current pathname

  // Check previous login and potentially resume timer on mount
  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus) {
      setIsLoggedIn(true);
      const lastLoginTime = localStorage.getItem('lastLoginTime');
      if (lastLoginTime) {
        const remainingTime = 15 * 60 * 1000 - (Date.now() - lastLoginTime);
        if (remainingTime > 0) {
          startLogoutTimer(remainingTime);
        } else {
          handleSignOut(); // Auto logout if time expired
        }
      }
    }
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearTimeout(logoutTimeoutRef.current);
  }, []);

  // Handle automatic logout if user navigates to the homepage
  useEffect(() => {
    if (location.pathname === '/') {
      handleSignOut();
    }
  }, [location.pathname]);

  // Functions
  const handleUserInteraction = () => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }
    startLogoutTimer();
  };

  const startLogoutTimer = (time = 15 * 60 * 1000) => {
    logoutTimeoutRef.current = setTimeout(handleSignOut, time);
  };

  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('lastLoginTime', Date.now());
    startLogoutTimer();
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastLoginTime');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to homepage
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    console.log(showProfile);
  };

  return (
    <MeasurementsProvider>
      <div onClick={handleUserInteraction} onScroll={handleUserInteraction}>
        <Nav isLoggedIn={isLoggedIn} onSignOut={handleSignOut} toggleProfile={toggleProfile} showProfile={showProfile} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/exercise-log" element={<ExcersiseLog />} />
          <Route  path="/login" element={<Login onLogin={handleLogin} />} />
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/signout" element={<SignOut />} />
          <Route  path="/previous-workouts" element={<PreviousWorkouts />} />
          <Route  path='/dashboard' element={<Dashboard showProfile={showProfile} toggleProfile={toggleProfile} />} />
          <Route  path='/forgotpassword' element={<ForgotPassword />} />
          <Route  path='/resetpassword' element={<ResetPassword />} />
          <Route  path='/recommender' element={<Recommender />} />
          <Route  path="/ExcersiseSearch" element={<ExcersiseSearch />} />
          <Route  path="/CreateWorkout" element={<CreateWorkout />} />
        </Routes>
      </div>
    </MeasurementsProvider>
  );
}

export default App;
