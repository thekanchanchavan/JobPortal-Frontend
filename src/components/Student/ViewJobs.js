import React, {useEffect, useState  } from "react";
import axios from "axios";
const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [appliedError, setAppliedError] = useState("");
    const [filter, setFilter] = useState({
        jobTitle: "",
        jobId:"",
        companyName:"", 
        location:"",
    });
    const filteredJobs = jobs.filter((job) => {
        return(
          (filter.jobTitle ==="" || (job.jobTitle && job.jobTitle.toLowerCase().includes(filter.jobTitle.toLowerCase()))) &&
          (filter.jobId === "" || (job.jobId && job.jobId.toString().includes(filter.jobId)))&&
          (filter.companyName === "" || (job.companyName && job.companyName.toLowerCase().includes(filter.companyName.toLowerCase()))) &&
          (filter.location === "" || (job.location && job.location.toLowerCase().includes(filter.location.toLowerCase())))
        );
    });
    useEffect(() => {
        if(localStorage.getItem('isAuthenticated') !== 'true'){
            window.location.href = '/login';
        }
    },[]);
    useEffect(() =>{
        const fetchJobs = async () =>{
            try{
             const  response = await axios.get("/student/alljobs");
             console.log("response:", Response.data);
             setJobs(Array.isArray(response.data.data) ? response.data.data : []);
            }catch(error){
                setError(error.response.data.error || "");
            }
        };
        fetchJobs();
    }, []);
    useEffect(() => {
        const fetchAppliedJobs = async () =>{
            try{
                let username = new URLSearchParams(window.location.search).get('username');
                console.log("Username:", username);
                const response = await axios.get(`/student/myappliedjobs/${username}`);
                setAppliedJobs(Array.isArray(response.data.data) ? response.data.data: []);
            }catch(error){
                setAppliedError(error.response.data.error || "");
            }
        };
        fetchAppliedJobs();
    },[]);
    return(
        <div style={{display:"flex", height:"100vh", width:"100%"}}>
        {/*Left Half: Available Jobs */}
        <div
        style={{
            flex:1,
            display:"flex",
            flexDirection:"column",
            borderRight:"1px solid #ccc",
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
                <h2>Avaiable Jobs</h2>
                {appliedError && <p style={{color:"red", marginBottom:"10px"}}>{appliedError}</p>}
                {/* Filter Section */}
                <details style={{marginBottom:"10px"}}>
                    <summary style={{cursor:"pointer", fontWeight:"bold"}}>Filter</summary>
                    <div style={{display:"flex", gap:"10px", marginTop:"10px", flexWrap:"wrap"}}>
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={filter.jobTitle}
                            onChange={e => setFilter({ ...filter, jobTitle: e.target.value})}
                            style={{padding:"5px", borderRadius:"4px", border:"1px solid #ccc"}}
                        />
                        <input
                        type="text"
                        placeholder="Company Name"
                        value={filter.companyName}
                        onChange={e => setFilter({ ...filter, companyName: e.target.value})}
                        style={{padding:"5px", borderRadius:"4px", border:"1px solid #ccc"}}
                        />
                        <input
                        type="text"
                        placeholder="Location"
                        value={filter.location}
                        onChange={e => setFilter({ ...filter, location: e.target.value})}
                        style={{padding:"5px", borderRadius:"4px", border:"1px solid #ccc"}}
                        />
                        <button
                        style={{
                        padding:"5px 10px",
                        borderRadius:"4px",
                        border:"none",
                        backgroundColor:"#007bff",
                        color:"#fff",
                        cursor:"pointer"
                        }}
                        onClick={() => setFilter({ jobTitle:"", jobId:"", companyName:"", location:""})}
                        >
                        clear
                        </button>  
                    </div>
                </details>
            </div>
            <div
            style={{
            flex:1,
            padding:"10px",
            backgroundColor:"#ffffff",
            }}
            >
                {filteredJobs.length === 0 && !error ? (
                    <p style={{marginBottom:"10px"}}>No jobs available at the moment.</p>
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
                        {filteredJobs.map((job) => (
                            <li
                            key={job.jobId}
                            style={{
                                border:"1px solid #ccc",
                                borderRadius:"5px",
                                padding:"10px",
                                maxWidth:"90%",
                                margin:"0 auto",
                                backgroundColor:"#f9f9f9",
                            }}
                            >
                                <h3 style={{marginBottom:"10px"}}>{job.jobTitle}</h3>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>JobId:</strong>{job.jobId}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Company:</strong>{job.companyName}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Recruiter:</strong>{job.recruiterUsername}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Salary:</strong>{job.salaryRange}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Skills Required:</strong>{job.skillsRequired}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Education Required:</strong>{job.educationRequired}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Experience Required:</strong>{job.experienceRequired}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Application DeadLine:</strong>{job.applicationDeadline}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Job Type:</strong>{job.jobType}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Date Posted:</strong>{job.datePosted}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Company Website:</strong>{" "}
                                    <a 
                                    href={job.companyWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                        {job.companyWebsite}
                                    </a>
                                </p>
                                <p style={{ marginBottom:"10px"}}>
                                    <strong>Description:</strong>{job.jobDescription}
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
                                        await axios.post(`/student/applyjob`,{
                                            jobid:job.jobId,
                                            appliedby:username,
                                            Headers:{
                                                "Content-Type": "application/json",
                                            },
                                        });
                                        alert("Applied.");
                                        const response = await axios.get(`/student/myappliedjobs/${username}`);
                                        setAppliedJobs(Array.isArray(response.data.data)? response.data.data: []);

                                    }catch(err){
                                        if(err.response.status === 409){
                                            alert("You have already applied for this job.");
                                        }else{
                                            alert("Failed to apply");
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
          { /* Right Half: Applied Jobs */}
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
            <h2>Applied Jobs</h2>
            {error && <p style={{ color:"red", marginBottom:"10px"}}>{error}</p>}
            {/* Filter Section for Applied Jobs*/}
            <details style={{marginBottom:"10px"}} >
                <summary style={{cursor:"pointer", fontWeight:"bold"}}>Filter</summary>
                <div style={{display:"flex", gap:"10px",marginTop:"10px", flexWrap:"wrap"}}>
                    <input 
                    type="text"
                    placeholder="Job Title"
                    value={filter.jobTitle}
                    onChange={e => setFilter({ ...filter, jobTitle:e.target.value})}
                    style={{ padding:"5px",borderRadius:"4px", border:"1px solid #ccc"}}
                    />

                    <input 
                    type="text"
                    placeholder="Job Id"
                    value={filter.jobId}
                    onChange={e => setFilter({ ...filter, jobId:e.target.value})}
                    style={{ padding:"5px",borderRadius:"4px", border:"1px solid #ccc"}}
                    />
                   <input 
                    type="text"
                    placeholder="Company Name"
                    value={filter.companyName}
                    onChange={e => setFilter({ ...filter, companyName:e.target.value})}
                    style={{ padding:"5px",borderRadius:"4px", border:"1px solid #ccc"}}
                    />
                   <input 
                    type="text"
                    placeholder="Location"
                    value={filter.location}
                    onChange={e => setFilter({ ...filter, location:e.target.value})}
                    style={{ padding:"5px",borderRadius:"4px", border:"1px solid #ccc"}}
                    />
                  <button 
                  style={{
                  padding:"5px 10px",
                  borderRadius:"4px",
                  border:"none",
                  backgroundColor:"007bff",
                  color:"#fff",
                  cursor:"pointer"
                  }}
                  onClick={() => setFilter({ jobTitle:"jobId", companyName:"", location:""})}
                  >
                 clear
                  </button>
                </div>
            </details>
        </div>
<div
style={{
    flex:1,
    padding:"10px",
    backgroundColor:"#ffffff",
}}
>
    {appliedJobs.filter((job) =>{
        return(
            (filter.jobTitle === "" || (job.jobTitle && 
                job.jobTitle.toLowerCase().includes(filter.jobTitle.toLowerCase()))) &&
                (filter.jobId === "" || (job.jobId && job.jobId.toString().includes(filter.jobId))) &&
                (filter.companyName === "" || (job.companyName && 
                    job.companyName.toLowerCase().includes(filter.companyName.toLowerCase())))
                );
    }).length === 0 && !error ? (
        <p style={{marginBottom:"10px"}}>No Aplied Jobs.</p>
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
        {appliedJobs.filter((job) =>{
            return(
                (filter.jobTitle ==="" || (job.jobTitle.toLowerCase().includes(filter.jobTitle.toLowerCase()))) &&
                (filter.jobId === "" || (job.jobId && job.jobId.toString.includes(filter.jobId))) &&
                (filter.companyName === "" ||(job.companyName &&
                   job.toLowerCase().includes(filter.companyName.toLowerCase()))) &&
                   (filter.location === "" || (job.location && job.location.toLowerCase().includes(filter.location.toLowerCase())))
            );
        }).map((job) => (
            <li 
            key={job.jobId}
            style={{
                border:"1px solid #ccc",
                borderRadius:"5px",
                padding:"10px",
                maxWidth:"600px",
                margin:"0 auto",
                backgroundColor:"#f9f9f9"
            }}
            > 
            <h3 style={{ marginBottom:"10px"}}> {job.jobTitle}</h3>
            <p style={{marginBottom:"10px"}}>
                <strong>JobId:</strong> {job.jobId}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Company:</strong> {job.companyName}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Recruiter:</strong> {job.recruiterUsername}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Location:</strong> {job.location}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Salary:</strong> {job.salaryRange}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>skills Required:</strong> {job.skillsRequired}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Education Required:</strong> {job.educationRequired}
            </p>
             <p style={{marginBottom:"10px"}}>
                <strong>Experience Required:</strong> {job.experienceRequired}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Application Deadline:</strong> {job.applicationDeadline}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>JobType:</strong> {job.jobType}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Date Posted:</strong> {job.datePosted}
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>company Website:</strong> {""}
                <a 
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                > 
                {job.companyWebsite}
                </a>
            </p>
            <p style={{marginBottom:"10px"}}>
                <strong>Description :</strong>{job.jobDescription}
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
                    const response = await axios.get(`/student/viewjobapplication/${job.applicationId}/${username}`);
                    const applicationData = response.data.data[0];
                    console.log("Application Data:", applicationData);
                    const modal =document.createElement("div");
                    modal.style.position ="fixed";
                    modal.style.top ="50%";
                    modal.style.left="50%";
                    modal.style.transform = "translate(-50%,-50%)";
                    modal.style.backgroundColor="#fff";
                    modal.style.padding="20px";
                    modal.style.boxShadow ="0 4ps rgba(0, 0,0,0.2)";
                    modal.style.zIndex=1000;
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
                    document.getElementById("withdrawButton").onclick=async () => {
                        try{
                            await axios.post(`/student/withdrawjobapplication/${applicationData.applicationId}/${username}`,{
                                Headers:{
                                    "Content-Type":"application/json",
                                },
                            });
                            alert("Application withdrawn successfully.");
                            document.body.removeChild(modal);
                            const response = await axios.get(`/student/myappliedjobs/${username}`);
                            setAppliedJobs(Array.isArray(response.data.data)? response.data.data : []);
                        }catch(err){
                            console.error("Error withdrawing application:", err);
                            if(err.status === 404){
                                alert("Application not found");
                            }else if(err.status === 400){
                                alert("Cannot withdraw a selected or rejected  application");
                            }else{
                                alert("Failed to withdraw application");
                            }
                        }
                    };
                    document.getElementById("deleteButton").onclick = async ()=>{
                        try{
                            await axios.delete(`/student/deletejobapplication/${applicationData.applicationId}/${username}`,{
                                Headers:{
                                    "Content-Type ": "application/json",
                                },
                            });
                            alert("Application deleted successfully.");
                            document.body.removeChild(modal);
                        }catch(err){
                            console.error("Error deleting application:", err);
                            if(err.status === 404){
                                alert("Application not found.");
                            }else if(err.status === 400){
                                alert("Cannot delete a selected or rejected application");
                            }else{
                                alert("Failed to delete application.");
                            }
                        }
                        try{
                            const response = await axios.get(`/student/myappliedjobs/${username}`);
                            setAppliedJobs(Array.isArray(response.data.data)? response.data.data : []);
                        }catch(err){
                            if(err.status === 404){
                                setAppliedJobs([]);
                            }else{
                                setAppliedJobs([]);
                            }
                        }
                    };
                    document.getElementById("reapplyButton").onclick = async () =>{
                        try{
                            await axios.post(`/student/reapplyjobapplication/${applicationData.applicationId}/${username}`,{
                                Headers:{
                                    "Content-Type": "application/json",
                                },
                            });
                            alert("Application repplied successfully.");
                            document.body.removeChild(modal);
                            const response = await axios.get(`/student/myappliedjobs/${username}`);
                            setAppliedJobs(Array.isArray(response.data.data)? response.data.data:[]);

                        }catch(err){
                            console.error("Error reapplying application", err);
                            if(err.status === 404){
                                alert("Application not found.");
                            }else if(err.status === 400){
                                alert("Cannot reapply for a non-withdrawn application");
                            }else{
                                alert("Failed to reapplied application.");
                            }
                        }
                    };
                    document.getElementById("cancelButton").onclick = () =>{
                        document.body.removeChild(modal);
                    };
                
                }catch(err){
                    console.log(err)
                    alert("Failed to fetch application details.");
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
export default  ViewJobs;