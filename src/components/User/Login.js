import React,{useState} from "react";
import axios from "axios";
const Login =() => {
    const [username,setUSername] = useState("");
    const[password,setPassword] =useState("");
    const[message, setMessage]=useState("");

    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("/user/login", {username, password});
            setMessage(response.data.message);
            if(response.status === 200){
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('usertype', response.data.messeage);

                if(response.data.messeage === "recruiter"){
                    window.location.href = `/recruiterprofile?username=${encodeURIComponent(username)}`;
                }else if(response.data.messeage === "student"){
                    window.location.href =`/studentprofile?username=${encodeURIComponent(username)}`;
                }else{
                     //
                }
            }
        }catch(error){
                if (error.response && error.response.status === 400){
                    setMessage(error.response.data.messeage);
                } else if (error.response && error.response.status === 401){
                    setMessage(error.response.data.messeage);
                } else if(error.response && error.response.status === 404){
                    setMessage(error.response.data.messeage);
                } else if(error.response && error.response.status === 500){
                    setMessage(error.response.data.messeage);
                } else if(error.response && error.response.status === 501){
                    if (error.response.data.messeage){
                    setMessage(error.response.data.messeage);
                    }else {
                        setMessage("server error");
                    }
                } else {
                        setMessage("server error");
                }
        }
        
    }
return (
    <div style={{display: "flex", justifyContent:"center", alignItems:"center", height:"100vh", backgroundColor:"#f0f2f5"}}>
        <div style= {{width:"400px",padding:"20px",backgroundColor:"#fff",borderRadius:"10px",
            boxShadow:"0 4px 6px rgba(0,0,0,0.1"}}>
            <h2 style={{ textAlign:"center", marginBottom:"20px", color:"#333"}}>login</h2>
            <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
                <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUSername(e.target.value)}
                style={{
                    padding:"10px",
                    fontsize:"16px",
                    borderRadius:"5px",
                    border: "1px solid #ccc",
                    outline:"none",    
                }}
                />
                <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    padding:"10px",
                    fontsize:"16px",
                    borderRadius:"5px",
                    border: "1px solid #ccc",
                    outline:"none",    
                }}
                />
                <button
                type="submit"
                style={{
                    padding:"10px",
                    fontsize:"16px",
                    borderRadius:"5px",
                    border:"none",
                    backgroundColor:"#1877f2",
                    color:"#fff",
                    cursor:"pointer"

                }}
                >
                    Login
                </button>
            </form>
            {message && <p style={{ marginTop:"15px",textAlign:"center",color:"red"}}>{message}</p>}
            <p style={{marginTop:"15px",textAlign:"center",color:"#333"}}>
                Don't have an account?{" "}
                <span 
                onClick={() =>(window.location.href="/register")}
                style={{color:"#1877f2",cursor:"pointer",textDecoration:"underline"}}
                >
                    Register
                </span>
            </p>
            <p style={{ marginTop:"15px",textAlign:"center", color:"#333"}}>
                forget password?{" "}
                <span
                onClick={() => (window.location.href="/resetpassword")}
                    style={{color:"#1877f2",cursor:"pointer",textDecoration:"underline"}}
                >
                    Reset
                    </span>
            </p>
        </div>
    </div>
);
};
export default Login;