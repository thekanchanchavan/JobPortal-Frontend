import React, {useState, useEffect} from "react";
import axios from "axios";
const ResetPassword =()=>{
    const[username,stateUsername]= useState("");
    const[password, setPassword] = useState("");
    const[message,setMessage] = useState("");
    const[otp,setOtp]=useState("");
    var[otpResponse,setOtpResponse] = useState("");
    const[otpVisible, setOtpVisible] = useState(false);
    const[timer,setTimer] = useState(120);
    useEffect(() =>{
        if(otpVisible && timer > 0){
            const countdown = setInterval(() =>{
                setTimer((prevTimer) => prevTimer-1);
            },1000);
            return () => clearInterval(countdown);
        }else if(timer === 0){
            setOtpVisible(false);
            setMessage("OTP expired.please try again");
        }
    },[otpVisible, timer]);
    const handleVerifyOTP = async()=> {
        try{
            //console.log(otpResponse);
            //console.log(otp)
            if(otpResponse.toString() === otp.toString()){
                setMessage("OTP verified succesfully");
                setOtpVisible(false);
                try{
                    const response = await axios.post("/user/resetpassword", {
                        username,
                        password
                    },{
                        headers:{
                            "Content-Type":"application/json",
                        },
                    });
                    setMessage(response.data);
                }catch(error){
                    if(error.response && error.response.status === 400){
                        setMessage(error.response.data);
                    }else if(error.response && error.response.status === 409){
                        setMessage(error.response.data);
                    }
                    else if(error.response && error.response.status === 501){
                        setMessage("server error, please try again later.");
                    }else {
                        setMessage(error.response?.data || "Reset password failed");
                    }
                }
            }else{
                setMessage("Invalid OPT. please try again");
            }
        }catch(error){
                console.error("Error verifying OTP:", error);
                setMessage("Failed to verify OTP. please try again");
            }      
    };
    const handleSendOTP = async ()=>{
        setOtpVisible(true);
        setTimer(120);
        setMessage("OTP has been sent to your email.");
        try{
            const response = await axios.post(
                `/api/otp/send?email=${encodeURIComponent(username)}`,
                {
                    headers:{
                        "Content-Type":"application/json",
                    },
                }
            );
            return response.data;
        }catch(error){
            console.error("Error resending OTP:", error);
            setMessage("Failed to resend OTP. please try again");
        }
    };
    const handleResetPassword = async(e)=>{
        e.preventDefault();
        try{
            const usernameEncoded = encodeURIComponent(username);
            const response = await axios.get(`/user/isuserpresent/${usernameEncoded}`);
            if(response.status === 200){
                if(response.data === true){
                    try{
                        const response2 = await axios.post(`/user/isvalidusernameandpassword`,
                            {
                                username,
                                password
                            },
                            {
                                headers:{
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        if(response2.status === 200){
                            let otpResponse = await handleSendOTP();
                            //console.log(otpResponse);
                            setOtpResponse(otpResponse);
                            setOtpVisible(true);
                        }
                    }catch(error){
                        if(error.response && error.response.status === 400){
                            setMessage("input fields are not valid.");
                        }else{
                            setMessage("Server error,please try  again later");
                        }
                    }
                }
            }
       }catch(error){
            if(error.response && error.response.status === 409){
                setMessage("User already exist.");
                }else{
                    setMessage("Server error,please try  again later");
                }
            }
};
return(
                    <div 
                    style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        height: "100vh",
                        backgroundColor:"#f0f2f5",
                    }}
                    >
                        <div
                        style={{
                            width:"400px",
                            padding:"20px",
                            backgroundColor:"#fff",
                            borderRadius:"10px",
                            boxShadow:"0 4px 6px rgba(0, 0 ,0,0.1)",
                        }}
                        >
                            <h2 style={{textAlign:"center", marginBottom:"20px",color:"#333"}}>
                                Reset password
                            </h2>
                            {!otpVisible ? (
                                <form
                                onSubmit={(e) =>{
                                    handleResetPassword(e);
                                    setOtp("");
                                    setMessage("");
                                }}
                                style={{ display:"flex",flexDirection:"column",gap:"15px"}}
                                >
                                <input 
                                    type="text"
                                    placeholder="Username"
                                value={username}
                                onChange={(e) => stateUsername(e.target.value)}
                                style={{
                                    padding:"10px",
                                    borderRadius:"5px",
                                    border:"1px solid #ccc",
                                    fontSize:"16px",
                                }}
                                />
                                <input
                                type="password"
                                placeholder="new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    padding:"10px",
                                    borderRadius:"5px",
                                    border:"1px solid #ccc",
                                    fontSize:"16px",
                                }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                    padding:"10px",
                                    borderRadius:"5px",
                                    border:"none",
                                    backgroundColor:"#1877f2",
                                    color:"#fff",
                                    fontSize:"16px",
                                    cursor:"pointer",
                                }}
                                >
                                Reset password
                                </button>
                                </form>
                            ):(
                                <div>
                                    <p>Enter the OTP sent to your email:</p>
                                    <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    style={{
                                        padding:"10px",
                                        width:"100%",
                                        marginBottom:"10px",
                                        border:"1px solid #ccc",
                                        borderRadius:"5px"
                                    }}
                                />
                                <div style={{display: "flex", gap:"10px"}}>
                                    <button
                                        onClick={handleVerifyOTP}
                                        style={{
                                            padding:"10px 20px",
                                            backgroundColor:"#007bff",
                                            color:"#fff",
                                            border:"none",
                                            borderRadius:"5px",
                                            cursor:"pointer",
                                        }}
                                    >
                                        Verify OTP
                                    </button>
                                    <button
                                        onClick={()=>{
                                            setOtpVisible(false);
                                            setOtp("");
                                            setMessage("");
                                        }}
                                        style={{
                                            padding:"10px 20px",
                                            backgroundColor:"#dc3545",
                                            color:"#fff",
                                            border:"none",
                                            borderRadius:"5px",
                                            cursor:"pointer",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <p style={{marginTop: "10px"}}>Time remaining: {timer} seconds</p>

                            </div>
                            )}
                            {message && (
                                <p
                                    style={{
                                        marginTop:"10px",
                                        color:"red",
                                        textAlign:"center",
                                    }}
                                >
                                    {message}
                                </p>
                            )}
                            
                </div>
        </div>
);
};

export default ResetPassword;