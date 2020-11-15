import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Explore from './pages/Explore/Explore';
import Upload from './pages/Upload/Upload';
import Profile from './pages/Profile/Profile';
import  { AuthContext } from './context/Auth';
import UserRoute from './middleware/UserRoute';

function App() {
  const existingUser = JSON.parse(localStorage.getItem('instaclone-userData'));
  const [userData, setUserData] = useState(existingUser);

  const setUser = (data) => {
    if ( data ) { localStorage.setItem('instaclone-userData', JSON.stringify(data)) } 
    else { localStorage.removeItem('instaclone-userData') }
    setUserData(data);
  }

  return (
    <AuthContext.Provider value={{ userData, setUserData: setUser}}>
      <Router>
        <UserRoute exact path="/" component={Home} />
        <UserRoute path="/explore" component={Explore} />
        <UserRoute path="/upload" component={Upload} />
        <UserRoute path="/profile/:id" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
