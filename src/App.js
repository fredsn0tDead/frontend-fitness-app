import logo from './logo.svg';

import { Route, Routes ,BrowserRouter, useLocation} from 'react-router-dom';
import { useState } from 'react';
import { ExcersiseLog } from './Components/ExcersiseLog';
import { Homepage } from './pages/Homepage';
import { Nav } from './Components/Nav';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { SignOut } from './Components/SignOut';
import { PreviousWorkouts } from './Components/PreviousWorkouts';
import { Dashboard } from './pages/Dashboard';
import { ForgotPassword } from './Components/ForgotPassword';
import { ResetPassword } from './Components/ResetPassword';
import { Recommender } from './Components/Recommender';
import { Excerise_store } from './Components/Excerise_store';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    
  };
  const handleSignOut = () => {
    // Handle sign out logic here

    setIsLoggedIn(false);
  };

  return (
    <div>
     <Nav isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />{/* placed the nav bar at top to be outted on each page */}

     <Routes>
     <Route  path="/" element={<Homepage/> }/>
     <Route exact path="/exercise-log" element= {<ExcersiseLog/>}/>
     <Route exact path="/login" element= {<Login onLogin={handleLogin}/>}/> 
      <Route exact path="/signup" element= {<Signup/>}/>
      <Route exact path="/signout" element= {<SignOut/>}/>
      <Route exact path ="/previous-workouts" element={<PreviousWorkouts/>}/>
      <Route exact path='/dashboard' element={<Dashboard/>}/>
      <Route exact path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route exact path='/resetpassword' element={<ResetPassword/>}/>
      <Route exact path='/recommender' element={<Recommender/>}/>
     
      <Route exact path="/ExcersiseStore" element={<Excerise_store/>} />
      
      </Routes>
    </div>
  );
}

export default App;
