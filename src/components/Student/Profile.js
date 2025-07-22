import react, {useState, useEffect} from "react";
import axios from "axios";

const StudentProfile = ()=>{
    const [profile, setProfile]= useState(null);
    const [error, setError]=useState("");
    const [isEditing, setIsEditing]=useState(false);
    const [formData, setFormData]= useState({
        name: "",
        mobilenumber:"",
        location:"",
        education:"",
        skills:"",
        image:"",
        resume:"",
    });
    useEffect(()=>{
        if (localStorage.getItem('isAuthenticated') !== 'true'){
            window.location.href='/login';
        }
    },[]);
    const fetchprofile = async() => {
        try{
            let username = new URLSearchParams(window.location.search).get(`username`);
            setFormData((prev) => ({ ...prev, username}));
            const response = await axios.get(`/student/myprofile/${username}`);
            const data = response.data;
            console.log("profile data:", data);
            setProfile(data);
            setFormData({
                username: data.username || "",
                name: data.name || "",
                mobilenumber: data.mobilenumber || "",
                location: data.location || "",
                education: data.education || "",
                skills: data.skills || "",
                image: data.image || "",
                resume: data.resume || "",
            });
        }catch(err){
            console.error("Error fetching profile:", err);
            setError(err.response?.data?.messeage || "Failed to fetch profile");
        }
    };
    const handleInputChange =(e) =>{
        const {name , value} =e.target;
        setFormData((prev) => ({ ...prev,[name]: value}));
    };
    const handleFileChange = (e) => {
        const { name, files} = e.target;
        const file = files[0];
        const reader = new FileReader();
        reader.onload =()=>{
            setFormData((prev) => ({ ...prev,[name]: reader.result}));
        };
        reader.readAsDataURL(file);
    };
    const handleUpdateProfile = async()=>{
        try{
            await axios.post("/student/updateprofile", formData);
            setIsEditing(false);
            fetchprofile();
        }catch(err){
            console.error("Error updating profile:",err);
            setError(err.response?.data?.messeage || "Failed to update profile");
            
        }
    };
     react.useEffect(() =>{
        fetchprofile();
     },[]);
     if(error){
        return <p>Error:{error}</p>;
     }
     if(!profile){
        return<p>Loaing...</p>;
     }
     if(isEditing){
    return(
        <div style={{display:"flex",justifyContent: "center",alignItems:"center",height:"90vh",fontFamily:"Arial,sans-serif"}}>
        <div style={{width:"400px", padding:"20px", borderRadius:"10px",boxShadow:"0 4px 8px rgba(0,0,0,0.1", backgroundColor:"#fff"}}>
        <h2 style={{ textAlign:"center", color:"#333",marginBottom:"5px"}}>Edit profile</h2>
        <form>
        <div style={{marginBottom:"5px"}}>
        <label style={{ display:"block", marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Name</label>
        <input 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        style={{
            width:"95%",
            padding:"10px",
            borderRadius:"5px",
            border:"1px solid #ddd",
            fontSize:"14px",
        }}
        />
        </div>
        <div style={{marginBottom:"5px"}}>
        <label style={{display:"block",marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Mobile</label>
        <input 
        type="text"
        name="mobilenumber"
        value={formData.mobilenumber}
        onChange={handleInputChange}
        style={{
            width:"95%",
            padding:"10px",
            borderRadius:"5px",
            border:"1px solid #ddd",
            fontSize:"14px",
        }}
        />
        </div>
            <div style={{marginBottom:"5px"}}>
            <label style={{display:"block",marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Location</label>
            <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                style={{
                    width:"95%",
                    padding:"10px",
                    borderRadius:"5px",
                    border:"1px solid #ddd",
                    fontSize:"14px",
                }}
            />
        </div>
       <div style={{marginBottom:"5px"}}>
        <label style={{display:"block",marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Education</label>
        <input 
        type="text"
        name="education"
        value={formData.education}
        onChange={handleInputChange}
        style={{
            width:"95%",
            padding:"10px",
            borderRadius:"5px",
            border:"1px solid #ddd",
            fontSize:"14px",
        }}
        />
        </div>
       <div style={{marginBottom:"5px"}}>
        <label style={{display:"block",marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Skills</label>
        <input 
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleInputChange}
        style={{
            width:"95%",
            padding:"10px",
            borderRadius:"5px",
            border:"1px solid #ddd",
            fontSize:"14px",
        }}
        />
        </div>
        <div style={{marginBottom:"5px"}}>
        <label style={{display:"block",marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Image</label>
        <input 
        type="file"
        name="image"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        style={{
            width:"95%",
            padding:"10px",
            borderRadius:"5px",
            border:"1px solid #ddd",
            fontSize:"14px",
        }}
        />
        </div>
        <div style={{marginBottom:"5px"}}>
        <label style={{display:"block",marginBottom:"5px", fontWeight:"bold", color:"#555"}}>Resume</label>
        <input 
        type="file"
        name="resume"
        accept="application/pdf,application/vnd.openxmlformats-officedocumemt.wordprocessingml.document"
        onChange={handleFileChange}
        style={{
            width:"95%",
            padding:"10px",
            borderRadius:"5px",
            border:"1px solid #ddd",
            fontSize:"14px",
        }}
        />
        </div>
        <div style={{display:"flex", justifyContent:"space-between",marginTop:"20px"}}>
        <button 
        type="button"
        onClick={handleUpdateProfile}
        style={{backgroundColor:"#007bff",
            color:"#fff",
            border:"none",
            padding:"10px 20px",
            borderRadius:"5px",
            cursor:"pointer",
            fontSize:"14px",
        }}
        >
        Submit
        </button>
        <button type="button"
        onClick={() => setIsEditing(false)}
        style={{
            backgroundColor:"#f44336",
            color:"#fff",
            border:"none",
            padding:"10px 20px",
            borderRadius:"5px",
            cursor:"pointer",
            fontSize:"14px",
        }}
        >
        Cancel
        </button>
        
        </div>
        </form>
        </div>
        </div>
    );
}
return(
    <div style={{fontFamily:"Arial, sans-serif",padding:"20px", height:"85vh", maxWidth:"1200px",
    margin:"0 auto",border:"1px solid #add", borderRadius:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0,0.1", 
    display:"flex", flexDirection:"row"}}>

        <div style={{flex:"1", padding:"10px",borderRight:"1px solid #ddd", textAlign:"center", 
            display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100%"}}>
            <img 
            src={profile.image}
            alt="Profile"
            style={{width:"200px", height:"200px", borderRight:"50%", objectFit:"cover", marginBottom:"20px"}}/>
            <h2 style={{margin:"10px 0",fontSize:"40px",color:"#333"}}>{profile.name}</h2>
            <p style={{margin:"10px 0", fontSize:"20px", color:"#555",textAlign:"left", width:"100%",
                marginLeft:"170px"}}>
            <strong>Username:</strong>{profile.username}
            </p>
            <p style={{margin:"10px 0", fontSize:"20px", color:"#555",textAlign:"left", width:"100%",
                marginLeft:"170px"}}>
            <strong>Mobile Number:</strong>{profile.mobilenumber}
            </p>
            <p style={{margin:"10px 0", fontSize:"20px", color:"#555",textAlign:"left", width:"100%",
                marginLeft:"170px"}}>
            <strong>Location:</strong>{profile.location}
            </p>
        </div>
        {/*Right Side */}
        <div style={{ flex:"1", padding:"20px", height:"100%", display:"flex", flexDirection:"column",
            justifyContent:"space-between"}}>
        <div>
        <div style={{marginBottom:"20px"}}>
            <h4 style={{fontSize:"20px", color:"#333", marginTop:"100px", marginLeft:"50px",
                marginBottom:"10px"}}>Education</h4>
            <p style={{fontSize:"16px", color:"#555", marginTop:"10px", marginLeft:"50px"}}>{profile.education}</p>
        </div>
        <div style={{marginBottom:"20px"}}>
            <h4 style={{fontSize:"20px", color:"#333", marginTop:"100px", marginLeft:"50px",
                marginBottom:"10px"}}>Skills</h4>
            <p style={{fontSize:"16px", color:"#555", marginTop:"10px", marginLeft:"50px"}}>{profile.skills}</p>
        </div>
        <div style={{marginBottom:"20px"}}>
            <h4 style={{fontSize:"16px", color:"#333", marginTop:"50px", marginLeft:"50px", marginBottom:"10px"}}>Resume</h4>
            <a
            href={profile.resume}
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{fontSize:"16px", color:"#007bff", marginTop:"50px", marginLeft:"50px", textDecoration:"none"}} 
            >
                Download Resume
            </a>
        </div>
        <div style={{textAlign:"center"}}>
            <button
                onClick={()=> setIsEditing(true)}
                style={{
                    backgroundColor:"#007bff",
                    color:"#fff",
                    border:"none",
                    padding:"10px 20px",
                    borderRadius:"5px",
                    cursor:"pointer",
                    fontSize:"16px",
                    marginTop:"50px", marginLeft:"50px",
                }}
            >
            Update profile
            </button>
            <button
                onClick={()=> window.location.href="/viewjobs?username="+encodeURIComponent(profile.username)}
                style={{
                    backgroundColor:"#28a745",
                    color:"#fff",
                    border:"none",
                    padding:"10px 20px",
                    borderRadius:"5px",
                    cursor:"pointer",
                    fontSize:"16px",
                    marginTop:"50px", marginLeft:"20px",
                }}
            >
            View Jobs
            </button>
            <button
                onClick={()=> window.location.href="/viewinternships?username="+encodeURIComponent(profile.username)}
                style={{
                    backgroundColor:"#17a2b8",
                    color:"#fff",
                    border:"none",
                    padding:"10px 20px",
                    borderRadius:"5px",
                    cursor:"pointer",
                    fontSize:"16px",
                    marginTop:"50px", marginLeft:"20px",
                }}
            >
            View Internships
            </button>
        </div>
    </div>
    </div>
    </div>
);
};
export default StudentProfile;