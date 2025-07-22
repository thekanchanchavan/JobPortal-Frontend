//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Shared/Navbar';
import Login from './components/User/Login';
import ViewJobs from './components/Student/ViewJobs';
import ViewInternships from './components/Student/ViewInternships';
import ViewJobs2 from './components/Recruiter/ViewJobs';
import ViewInternships2 from './components/Recruiter/ViewInternhships';
import Register from './components/User/Register';
import Profile from './components/Student/Profile';
import Profile2 from './components/Recruiter/Profile';
import Home from './components/User/Home';
import UpdatePassword from './components/User/UpdatePassword';
import ResetPassword from './components/User/ResetPassword';
function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/updatepassword" element={<UpdatePassword />}/>
          <Route path="/resetpassword" element={<ResetPassword />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/viewjobs" element={<ViewJobs username={decodeURIComponent(new URLSearchParams(window.location.search).get('username'))}/>}/>
          <Route path="/viewinternships" element={<ViewInternships username={decodeURIComponent(new URLSearchParams(window.location.search).get('username'))}/>}/>
          <Route path="/viewalljobs" element={<ViewJobs2 username={decodeURIComponent(new URLSearchParams(window.location.search).get('username'))}/>}/>
          <Route path="/viewallinternships" element={<ViewInternships2 username={decodeURIComponent(new URLSearchParams(window.location.search).get('username'))}/>}/>
          <Route path="/studentprofile" element={<Profile username={decodeURIComponent(new URLSearchParams(window.location.search).get('username'))}/>}/>
          <Route path="/recruiterprofile" element={<Profile2 username={decodeURIComponent(new URLSearchParams(window.location.search).get('username'))}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
