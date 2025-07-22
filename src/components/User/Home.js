import React from 'react';
import {useNavigate} from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    const updatePassword = () => {
        navigate('/updatepassword');
    };
    const handleRegister =() =>{
        navigate('/register');
    };
    const resetPassword =() =>{
       navigate('/resetpassword');
    };
    return(
        <div style ={{display: 'flex',marginTop:'10px',flexDirection:'column',alignItems: 'center',height:'80vh',textAlign:'center',justifyContent:'flex=start',paddingTop:'40px',fontsize:'1.7rem',color:'black'}}>
        <h1>Welcome to the ZIDIO Connect</h1>
        <div style={{ marginTop:'10px',maxWidth:'900px',fontSize:'1.2rem',}}>
            <p>Comprehensive web-based portal designed to streamline and manage internships and job opportunities for students and recruiters.</p>
        </div>
        <div style={{marginTop:'10px'}}>
            <button onClick={handleRegister} style={{marginRight:'10px',padding:'10px 20px',fontsize:'1rem',color:'black'}}>
             Register
            </button>
            <button onClick={handleLogin} style={{marginRight:'10px',padding:'10px 20px',fontsize:'1rem',color:'black'}}>
            Login
            </button>
            <button onClick={updatePassword} style={{marginRight:'10px',padding:'10px 20px',fontsize:'1rem',color:'black'}}>              
            Update Password
            </button>
            <button onClick={resetPassword} style={{marginRight:'10px',padding:'10px 20px',fontsize:'1rem',color:'black'}}>
            Reset Password
            </button>
        </div>
    </div>
    );

    };
    export default Home;
