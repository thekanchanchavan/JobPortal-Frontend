import React,{useEffect,useState} from "react";
import axios from "axios";
const ViewInternships=() => {
    const [jobs, setJobs]= useState([]);
    const[error,setError]= useState("");
    const[appliedJobs, setAppliedJobs] = useState([]);
    const[appliedError, ssetAppliedError]= useState("");
    useEffect(() =>{
        if(localStorage.getItem('isAuthenticated') !== 'true'){
            window.location.href ='/login';
        }
    },[]);
    useEffect(() =>{
        const fetchJobs = async() =>{
            try{
                const response = await axios.get("/student/allinternships");
                console.log("response",response.data);
                setJobs(Array.isArray(response.data.data) ? response.data.data : []);
            }catch(error){
                setError(error.response.data.error || " ");
            }
        };
        fetchJobs();
    },[]);
    useEffect(() =>{
        const fetchAppliedJobs = async()=>{
            try{
                let username = new URLSearchParams(window.location.search).get('username');
                console.log("username :", username);
                const response = await axios.get(`/student/myappliedinternships/${username}`);
                setAppliedJobs(Array.isArray(response.data.data) ? response.data.data : []);
            }catch(error){
                console.error("error fetching applied internships:" , error);
                ssetAppliedError(error.response?.data?.error || "");
            }
        };
        fetchAppliedJobs();
    },[]);


    return(
        <div style={{display:"flex", height:"100vh", width:"100%"}}>
            {/* Left half: available jobs */}
        <div 
        style={{
            flex:1,
            diplay:"flex",
            flexDirection:"column",
            borderRight:"1px solid #ccc",
            overflowY:"auto",
        }}
        >
            <div
            style={{
                position:"sticky",
                top:0,
                background:"#f8f9fa",
                padding:"10px",
                borderBottom:"1px solid #ccc",
                zIndex:1000,
            }}
            >
                <h2>Avaliable Internships</h2>
                {appliedError && <p style={{color:"red", marginBottm:"10px"}}>{appliedError}</p>}
            </div>
            <div
            style={{
                flex:1,
                padding:"10px",
                backgroundColor:"#ffffff",
            }}
            >
                {jobs.length === 0 && !error ? (
                    <p style={{ marginBottm:"10px"}}>No Internships Avaiable at the moment.</p>
                ):(
                    <ul
                    style={{
                        padding:"0",
                        listStyleType:"none",
                        display:"flex",
                        flexDirection:"column",
                        gap:"20px",
                    }}
                    >
                        {jobs.map((job) =>(
                            <li 
                            key={job.jonId}
                            style={{
                                border: "1px solid #ccc",
                                 borderRadius:"5px",
                                 padding:"10px",
                                 maxWidth:"90%",
                                 margin:"0 auto",
                                 backgroundColor:"#f9f9f9",
                            }}
                            >
                                <h3 style={{ marginBottm:"10px"}}>{job.internshipTitle}</h3>
                                <p style={{marginBottm:"10px"}}>
                                    <strong>InternshipId:</strong>{job.internshipId}
                                </p>
                                <p style={{ marginBottm:"10px"}}>
                                    <strong>Company:</strong>{job.companyName}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Location:</strong>{job.location}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Stipend::</strong>{job.stipend}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Skills Required:</strong>{job.skillsRequired}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Education Required:</strong>{job.educationRequired}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Start Date:</strong>{job.startDate}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>End Date:</strong>{job.endDate}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Application DeadLine:</strong>{job.applicationDeadline}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Date Posted:</strong>{job.datePosted}
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Company Website:</strong>{" "}
                                <a 
                                href={job.companyWebsite}
                                target="-blank"
                                rel="noopener noreferrer"
                                >
                                    {job.companyWebsite}
                                </a>
                                </p>
                                <p style={{marginBottm:"10px"}}>
                                <strong>Description:</strong>{job.internshipDescription}
                                </p>
                                <button
                                style={{
                                    marginTop:"10px",
                                    padding:"10px 15px",
                                    backgroundColor:"#007bff",
                                    color:"#fff",
                                    border:"none",
                                    borderRadius:"5px",
                                    cursor:"pointer",
                                }}
                                onClick={async () => {
                                    const username = new URLSearchParams(window.location.search).get(`username`);
                                    try{
                                        await axios.post(`/student/applyinternship`, {
                                            internshipid:job.internshipId,
                                            appliedby: username,
                                            Headers:{
                                                "Content-Type":"application/json",
                                            },
                                        });
                                        alert("applied.");
                                        const response = await axios.get(`/student/myappliedinternships/${username}`);
                                        setAppliedJobs(Array.isArray(response.data.data) ? response.data.data: []);
                                    }catch(err){
                                        if(err.response.status === 409){
                                            alert("you have already applied for this Internship.");
                                        } else{
                                            console.log(err);
                                            alert("Failed to apply.");
                                        }
                                    }
                                }}
                                >
                                    Apply
                                </button>
                            </li>
                        ))}
                    </ul>         
                )}
            </div>
        </div>
        {/*Right Half :Applied jobs*/}
        <div
        style={{
            flex:1,
            display:"flex",
            flexDirection:"column",
            overflowY:"auto",
        }}
        >
       <div 
       style={{
        position:"sticky",
        top:0,
        backgroundColor:"#f8f9fa",
        padding:"10px",
        borderBottom:"1px solid #ccc",
        zIndex:1000,
       }}
       >
        <h2>Applied Internships</h2>
        {error && <p style={{color:"red", marginBottm:"10px"}}>{error}</p>}
       </div>
       <div
       style={{
        flex:1,
        padding:"10px",
        backgroundColor:"#ffffff",
       }}
       > 
       {appliedJobs.length === 0 && !error ? (
        <p style={{ marginBottm:"10px"}}>No Applied Internships</p>
       ):(
        <ul 
        style={{
            padding:"0",
            listStyleType:"none",
            display:"flex",
            flexDirection:"column",
            gap:"20px",
        }}
        > 
        {appliedJobs.map((job) =>(
            <li 
            key={job.jonId}
            style={{
                border:"1px solid #ccc",
                borderRadius:"5px",
                padding:"10px",
                maxWidth:"600px",
                margin:"0 auto",
                backgroundColor:"#f9f9f9",
            }}
            >
                <h3 style={{ marginBottm :" 10px"}}>{job.internshipTitle}</h3>
                <p style={{ marginBottm:"10px"}}>
                <strong>internhsipId:</strong>{job.internshipId}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Company:</strong>{job.companyName}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Recruiter:</strong>{job.recruiterUsername}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Location:</strong>{job.location}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Stipend:</strong>{job.stipend}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Skills Required:</strong>{job.skillsRequired}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Education Required:</strong>{job.educationRequired}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Start Date:</strong>{job.startDate}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>End Date:</strong>{job.endDate}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Application DeadLine:</strong>{job.applicationDeadline}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Date Posted:</strong>{job.datePosted}
                </p>
                <p style={{ marginBottm:"10px"}}>
                <strong>Company Website:</strong>{" "}
                <a
                 href={job.companyWebsite}
                 target="-blank"
                 rel="noopener noreferrer"
                >
                    {job.companyWebsite}                  
                </a>
                </p>
                <p style={ {marginBottm:"10px"}}>
                    <strong>Description:</strong>{job.internshipDescription}
                </p>
                <button
                style={{
                    marginTop:"10px",
                    padding:"10px 15px",
                    backgroundColor:"#007bff",
                    color:"#fff",
                    border:"none",
                    borderRadius:"5px",
                    cursor:"pointer",
                }}
                onClick={async () => {
                    const username = new URLSearchParams(window.location.search).get('username');
                    try{
                        const response = await axios.get(`/student/viewinternshipapplication/${job.applicationId}/${username}`);
                        const applicationData = response.data.data[0];
                        console.log("Application Date:", applicationData);
                        const modal = document.createElement("div");
                        modal.style.position ="fixed";
                        modal.style.top ="50%";
                        modal.style.left ="50%";
                        modal.style.transform = "translate(-50% , -50%)";
                        modal.style.background ="#fff";
                        modal.style.padding= "20px";
                        modal.style.boxShadow ="0 4px 8px rgba(0, 0,0,0.2)";
                        modal.style.zIndex = 1000;
                        modal.innerHTML = `
  <h3>Application Details</h3>
  <p><strong>Application Id:</strong> ${applicationData.applicationId}</p>
  <p><strong>Status: </strong>${applicationData.status}</p>
  <p><strong>Applied time:</strong> ${applicationData.appliedTime}</p>
  <button id="withdrawButton" style="margin-right: 10px; padding:10px 15px; background-color:rgb(187,120,127);color:#fff; border:none;border-radius:5px; cursor:pointer;">Withdraw</button>
  <button id="deleteButton" style="margin-right: 10px; padding: 10px 15px; background-color:rgb(166,7,7);color:#fff;border:none;border-radius:5px; cursor: pointer;">Delete</button>
  <button id="reapplyButton" style="margin-right:10px ; padding:10px 15px; background-color:rgb(19,88,31);color:#fff; border:none; border-radius:5px; cursor:pointer;">Reapply</button>
  <button id="cancelButton" style="padding: 10px 15px; background-color: #6c757d; color:#fff;border:none; border-radius:5px; cursor:pointer;">Cancel</button>
`;
                        document.body.appendChild(modal);
                        document.getElementById("withdrawButton").onclick = async ()=>{
                          try{
                            await axios.post(`/student/withdrawinternshipapplication/${applicationData.applicationId}/${username}`,{
                                Headers:{
                                    "Content-Type": "application/json",
                                },
                            });
                            alert("Application withdrawn sucessfully.");
                            document.body.removeChild(modal);
                            const response = await axios.get(`/student/myappliedinternships/${username}`);
                            setAppliedJobs(Array.isArray(response.data.data)? response.data.data: []);
                          }catch(err){
                            console.error("Error withdrawing application:", err);
                            if(err.status === 404){
                                alert("Application not found.");
                            }else if(err.status === 404){
                                alert("Cannot withdraw a selected or rejectedd application");
                            }else{
                                alert("Failed to withdraw application.");
                            }
                          }
                        };
                        document.getElementById("deleteButton").onclick =async () =>{
                            try{
                                await axios.delete(`/student/deleteinternshipapplication/${applicationData.applicationId}/${username}`,{
                                    Headers:{
                                        "Content-Type":"application/json",
                                    },
                                });
                                alert("Application deleted successfully.");
                                document.body.removeChild(modal);
                            }catch(err){
                                console.error("Error deleting application:");
                                if(err.status === 404){
                                    alert("Application not found");
                                }else {
                                    if(err.response.data.messeage){
                                        alert(err.response.data.messeage);
                                    }
                                }
                            }
                            try{
                                const response = await axios.get(`/student/myappliedinternships/${username}`);
                                setAppliedJobs(Array.isArray(response.data.data)? response.data.data : []);
                            }catch(err){
                                if(err.status === 404){
                                    setAppliedJobs([]);
                                }else{
                                    setAppliedJobs([]);
                                }
                            }
                            
                    };
                    document.getElementById("reapplyButton").onclick = async () => {
                        try{
                            await axios.post(`/student/reapplyinternshipapplication/${applicationData.applicationId}/${username}`,{
                                Headers :{
                                    "Content-Type": "application/json",
                                },
                            });
                            alert("Application reapplied successfully.");
                            document.body.removeChild(modal);
                            const response = await axios.get(`/student/myappliedinternships/${username}`);
                            setAppliedJobs(Array.isArray(response.data.data) ? response.data.data: []);
                        }catch(err){
                            console.error("Error reappling application:" +err);
                            if(err.status === 404){
                                alert("Application not found.");
                            }else if(err.status === 400){
                                alert("Cannot reapply for a non-withdrawn application");
                            }else{
                                alert("Failed to reapplied application.");
                            }
                        }
                    };
                    document.getElementById("cancelButton").onclick = () => {
                        document.body.removeChild(modal);
                    };
                }catch(err){
                    console.log(err);
                    alert("failed to fetch application details.");
                }
                }}
                >
                View Application
                </button>
            </li>
        ))}
        </ul>   
       )}
       </div>
        </div>
        </div>
    ); 
};
export default ViewInternships;