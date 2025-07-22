import React, {useState} from "react";
import axios from "axios";

const UpdatePassword = () => {
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword]= useState("");
    const [newPassword, setNewPassword]= useState("");
    const[message, setMessage]= useState("");

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try{
            let passwordUrlEncoded = encodeURIComponent(oldPassword);
            const response = await axios.post(`/user/changepassword/${passwordUrlEncoded}`,{
                username,
                password: newPassword,
            });
            setMessage(response.data);
        }catch(error){
            if (error.response && error.response.data){
                setMessage(error.response.data);
            } else {
                setMessage("Server error");
            }
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor:"#f0f2f5",
            }}
        >
            <div style={{
                width:"400px",
                padding: "20px",
                backgroundColor:"#fff",
                borderRadius:"10px",
                boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
                }}
            >
                <h2
                    style={{
                        textAlign:"center",
                        marginBottom:"20px",
                        color:"#333",
                    }}
                >
                    Update Password
                </h2>
                <form
                    onSubmit={handleUpdatePassword}
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"15px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        style={{
                            padding:"10px",
                            fontSize:"16px",
                            borderRadius:"5px",
                            border:"1px solid #ccc",
                            outline:"none",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e)=> setOldPassword(e.target.value)}
                        style={{
                            padding:"10px",
                            fontSize:"16px",
                            borderRadius:"5px",
                            border:"1px solid #ccc",
                            outline:"none",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e)=> setNewPassword(e.target.value)}
                        style={{
                            padding:"10px",
                            fontSize:"16px",
                            borderRadius:"5px",
                            border:"1px solid #ccc",
                            outline:"none",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding:"10px",
                            fontSize:"16px",
                            borderRadius:"5px",
                            border:"none",
                            backgroundColor:"#1877f2",
                            color:"#fff",
                            cursor:"pointer",
                        }}
                    >
                        Update Password
                    </button>
                </form>
                {message && (
                    <p
                        style={{
                            marginTop:"15px",
                            textAlign:"center",
                            color:"red",
                        }}
                    >
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

export default UpdatePassword;