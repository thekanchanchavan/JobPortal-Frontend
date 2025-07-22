import React,{useEffect, useState}from "react";
import axios from "axios";
const ViewInternships=() => {
    const[jobs, setJobs] = useState([]);
    const[error,setError] = useState("");
    const[appliedJobs, setAppliedJobs] = useState([]);
    const[appliedError, setAppliedError] = useState("");
    useEffect(() =>{
        if(localStorage.getItem('isAuthenticated') !== 'true'){
            window.location.href='/login';
        }
    },[]);
    useEffect(() =>{
        const fetchJobs = async() =>{
            try{
                const response = await axios.get("/recruiter/allinternships");
                console.log("response:", response.data);
                setJobs(Array.isArray(response.data.data)? response.data.data:[]);
            }catch(error){
                console.log("error is:"+error);
                setError(error.response.data.error || "");
            }
        };
        fetchJobs();
    },[]);
    useEffect(() =>{
        const fetchAppliedJobs = async()=>{
            try{
                let username = new URLSearchParams(window.location.search).get('username');
                //console.log("Username:", username);
                const response =await axios.get(`/recruiter/internshipsbyme/${username}`);
                //console.log(response);
                setAppliedJobs(Array.isArray(response.data.data)? response.data.data: []);
            }catch(error){
                console.error("Error fetching posted internships:", error);
                setAppliedError(error.response?.data?.error || "");
            }
        };
        fetchAppliedJobs();
    },[]);
    return(
        <div style={{display:"flex", height:"100vh", width:"100%"}}>
            {/* Left Half : Available Jobs*/}
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
                    <h2>Available internships</h2>
                    {appliedError && <p style={{color:"red", marginBottom:"10px"}}>{appliedError}</p>}
                </div>
                <div
                style={{
                    flex:1,
                    padding:"10px",
                    backgroundColor:"#ffffff",
                }}
                >
                    {jobs.length === 0 && !error ? (
                        <p style={{marginBottom:"10px"}}>No internhships available at the moment.</p>
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
                             <h3 style={{marginBottom:"10px"}}>{job.internshipTitle}</h3>
                             <p style={{marginBottom:"10px"}}>
                                <strong>internhshipId:</strong>{job.internshipId}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>company:</strong>{job.companyName}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>recruiter:</strong>{job.recruiterUsername}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Location:</strong>{job.location}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Stipend:</strong>{job.stipend}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Skills Required:</strong>{job.skillsRequired}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Education Required:</strong>{job.educationRequired}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Start Date:</strong>{job.startDate}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>End Date:</strong>{job.endDate}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Application Deadline:</strong>{job.applicationDeadline}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Date Posted:</strong>{job.datePosted}
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Company website:</strong>{""}
                                <a
                                href={job.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    {job.companyWebsite}
                                </a>
                             </p>
                             <p style={{marginBottom:"10px"}}>
                                <strong>Description:</strong>{job.internshipDescription}
                             </p>
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* Right Half : Applied Jobs*/}
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
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
            }}
            >
                <h2>Internships By Me</h2>
                <button
                onClick={() =>{
                    const modal = document.createElement("div");
                    modal.style.position="fixed";
                    modal.style.top="50%";
                    modal.style.left="50%";
                    modal.style.transform="translate(-50%,-50%)";
                    modal.style.backgroundColor = "#fff";
                    modal.style.padding="5px";
                    modal.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)";
                    modal.style.zIndex=1050;
                    modal.style.borderRadius="10px";
                    modal.style.width="90%";
                    modal.style.maxWidth="500px";
                    modal.innerHTML=`
                        <h3 style="text-align: center; margin-bottom:5px;">Add Internship</h3>
                        <form id="addJobForm" style="display:flex; flex-direction: column; gap:10px;">
                            <label style="display: flex; justify-content:space-between; align-items: gap: 10px;">
                                <span>Internship Title</span>
                                <input type = "text" id="internshipTitle" required style="flex:1;padding:5px; border:1px solid #ccc; border-radius: 5px;"/>
                            </label>
                    <label style="display:flex; justify-content:space-between; align-items: center; gap:10px;">
                         <span>Intenship Description</span>
                         <textarea id="internshipDescription" required style="flex:1; padding:5px;border:1px solid #ccc;border-radius: 5px;"></textarea>
                    </label>
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>Location</span>
                         <input type="text" id="location" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label>
                    <label style="display:flex; justify-content:space-between;align-items:center;gap:10px;">
                        <span>Company Website</span>
                        <input type="text" id="companyWebsite" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label>
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>CompanyName</span>
                         <input type="text" id="companyName" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label> 
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>stipend</span>
                         <input type="text" id="stipend" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label> 
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span> Start Date</span>
                         <input type="text" id="startDate" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label> 
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>End Date</span>
                         <input type="text" id="endDate" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label>  
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>skills Required</span>
                         <input type="text" id="skillsRequired" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label>   
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>Education Required</span>
                         <input type="text" id="educationRequired" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label>   
                    <label style="display: flex; justify-content:space-between: align-items:center; gap:10px;">
                         <span>Application Deadline</span>
                         <input type="text" id="applicationDeadline" required style="flex:1; padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                    </label> 
                    <div style="display: flex; justify-content:space-between; align-items:center; gap:10px;">
                        <button type="submit" style="flex:1; padding:5px; background-color: #007bff ;color:#fff;border:none; border-radius:5px; cursor:pointer;">Submit </button>
                        <button type="button" id="cancelButton" style="flex: 1; padding: 5px; background-color: #6c757d; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                    </div>
                    </form>
                    `;
                    document.body.appendChild(modal);
                    document.getElementById("cancelButton").onclick =() =>{
                        document.body.removeChild(modal);
                    };
                    document.getElementById("addJobForm").onsubmit = async(e)=>{
                        e.preventDefault();
                        const username = new URLSearchParams(window.location.search).get('username');
                        const jobData ={
                            recruiterUsername:username,
                            internshipTitle:document.getElementById("internshipTitle").value,
                            internshipDescription:document.getElementById("internshipDescription").value,
                            location:document.getElementById("location").value,
                            companyWebsite:document.getElementById("companyWebsite").value,
                            companyName:document.getElementById("companyName").value,
                            stipend:document.getElementById("stipend").value,
                            startDate:document.getElementById("startDate").value,
                            endDate:document.getElementById("endDate").value,
                            skillsRequired:document.getElementById("skillsRequired").value,
                            educationRequired:document.getElementById("educationRequired").value,
                            datePosted:new Date().toISOString().split("T")[0],
                            applicationDeadline:document.getElementById("applicationDeadline").value,
                        };
                        try{
                            await axios.post("recruiter/addinternship", jobData,{
                                headers: {
                                    "Content-Type":"application/json",
                                },
                            });
                            alert("internship added successfully!");
                            document.body.removeChild(modal);
                            const response = await axios.get(`/recruiter/allinternships`);
                            setJobs(Array.isArray(response.data.data)? response.data.data:[]);
                        }catch(err){
                            console.error("Error adding internship:",err);
                            alert("Failed to add internship.");
                        }
                        try{
                            const response = await axios.get(`/recruiter/internshipsbyme/${username}`);
                            setAppliedJobs(Array.isArray(response.data.data)?response.data.data:[]);
                        }catch(err){
                            console.error("Error fetching applied internships after adding internship:",err);
                            setAppliedJobs([]);
                        }
                    };
                }}
                style={{
                    marginTop:"10px",
                    padding:"10px 15px",
                    backgroundColor:"#007bff",
                    color:"#fff",
                    border:"none",
                    borderRadius:"5px",
                    cursor:"pointer",
                }}
                >Add Internship
                </button>
                {error && <p style={{color:"red", marginBottom:"10px"}}>{error}</p>}
                </div>
                <div 
                    style={{
                        flex:1,
                        padding:"10px",
                        backgroundColor:"#ffffff",
                    }}
                >
                {appliedJobs.length ===0 && !error ? (
                    <p style={{marginBottom:"10px"}}>No Posted Internships.</p>
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
                              key={job.internshipId}
                              style={{
                                border:"1px solid #ccc",
                                borderRadius:"5px",
                                padding:"10px",
                                maxWidth:"600px",
                                margin:"0 auto",
                                backgroundColor:"#f9f9f9",
                              }}
                            > 
                            <h3 style={{marginBottom:"10px"}}>{job.internshipTitle}</h3>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>internhshipId:</strong>{job.internshipId}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Company:</strong>{job.companyName}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>recruiter:</strong>{job.recruiterUsername}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Location:</strong>{job.location}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Stipend:</strong>{job.stipend}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Skills Required:</strong>{job.skillsRequired}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Education Required:</strong>{job.educationRequired}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Start Date:</strong>{job.startDate}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>End Date:</strong>{job.endDate}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Application Deadline:</strong>{job.applicationDeadline}
                            </p>
                            <p style={{marginBottom:"10px"}}>
                                 <strong>Date posted:</strong>{job.datePosted}
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
                            <p style={{marginBottom:"10px"}}>
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
                            onClick={async () =>{
                                const username = new URLSearchParams(window.location.search).get('username');
                                try{
                                    const response= await axios.post(`/recruiter/applicationsforinternship`,
                                        {
                                            internshipId:job.internshipId,
                                            recruiterUsername:username,
                                        },
                                        {
                                            headers:{
                                                "Content-Type":"application/json"
                                            },
                                        }
                                    );

                                    const applicationData = response.data.data;
                                    console.log(applicationData)
                                    const modal= document.createElement("div");
                                    modal.style.position="fixed";
                                    modal.style.borderRadius="10px";
                                    modal.style.top="50%";
                                    modal.style.left="50%";
                                    modal.style.transform="translate(-50%,-50%)";
                                    modal.style.backgroundColor="#fff";
                                    modal.style.padding="20px";
                                    modal.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)";
                                    modal.style.zIndex=1000;
                                    modal.style.overflowY="auto";
                                    modal.style.maxHeight="80vh";
                                    modal.style.width="90%";
                                    modal.style.maxWidth="600px";

                                    const headerDiv = document.createElement("div");
                                    headerDiv.style.position="sticky";
                                    headerDiv.style.top="0";
                                    headerDiv.style.backgroundColor="#f8f9fa";
                                    headerDiv.style.padding="10px";
                                    headerDiv.style.borderBottom="1px solid #ccc";
                                    headerDiv.style.zIndex="1000";
                                    headerDiv.style.display="flex";
                                    headerDiv.style.justifyContent="space-between";
                                    headerDiv.style.alignItems="center";

                                    const headerTitle = document.createElement("h3");
                                    headerTitle.style.margin="0";
                                    headerTitle.textContent ="Applications Details";

                                    const closeButton = document.createElement("button");
                                    closeButton.style.backgroundColor="transparent";
                                    closeButton.style.border="none";
                                    closeButton.style.fontSize="20px";
                                    closeButton.style.cursor="pointer";
                                    closeButton.style.cursor="#10005";
                                    closeButton.innerHTML="&#10005;";
                                    closeButton.onclick =()=> document.body.removeChild(modal);
                                    headerDiv.appendChild(headerTitle);
                                    headerDiv.appendChild(closeButton);
                                    modal.appendChild(headerDiv);

                                    applicationData.forEach(application =>{
                                        const applicationDiv = document.createElement("div");
                                        applicationDiv.style.borderBottom="1px solid #ccc";
                                        applicationDiv.style.marginBottom="10px";
                                        applicationDiv.style.paddingBottom="10px";
                                        applicationDiv.style.display="flex";
                                        applicationDiv.style.justifyContent="space-between";
                                        applicationDiv.style.alignContent="center";
                                        
                                        const applicationDetails =document.createElement("div");
                                        let sts = application.status;
                                        applicationDetails.innerHTML= `
                                        <p><strong>Application Id :</strong> ${application.applicationId}</p>
                                        <p><strong>Applied By:</strong> ${application.appliedBy}</p>
                                        <p><strong>Applied Time:</strong> ${application.appliedTime}</p>
                                        <p><strong>Status:</strong> ${application.status}</p>
                                        `;
                                        const viewButton = document.createElement("button");
                                        viewButton.style.padding="5px 10px";
                                        viewButton.style.backgroundColor ="#007bff";
                                        viewButton.style.color="#fff";
                                        viewButton.style.border="none";
                                        viewButton.style.borderRadius="5px";
                                        viewButton.style.cursor="pointer";
                                        viewButton.textContent="View";
                                        viewButton.onclick =async()=>{
                                            await fetchStudentProfile(application.appliedBy, application.applicationId);
                                            try{
                                                const response = await axios.post(`/recruiter/viewinternshipapplication/${application.applicationId}`,
                                                    {
                                                        username:username
                                                    },
                                                    {
                                                        headers:{
                                                            "Content-Type":"application/json",
                                                        },
                                                    }
                                                );
                                                if(response.status === 200){
                                                    
                                                    let responsestatus = response.data.data[0].status;
                                                    const applicationDetails = applicationDiv.querySelector("p:last-child");
                                                    applicationDetails.innerHTML =`<strong>Status:</strong> ${responsestatus}`;
                                                }
                                            }catch(err){
                                                console.error("Error updating profile view status:", err);
                                            }
                                        };
                                        applicationDiv.appendChild(applicationDetails);
                                        applicationDiv.appendChild(viewButton);
                                        const selectButton = document.createElement("button");
                                        selectButton.style.padding="5px 10px";
                                        selectButton.style.backgroundColor="#007bff";
                                        selectButton.style.color="#fff";
                                        selectButton.style.border="none";
                                        selectButton.style.borderRadius="5px";
                                        selectButton.style.cursor="pointer";
                                        selectButton.textContent ="select";
                                        selectButton.onclick = async() =>{
                                            try{
                                                const response = await axios.post(`/recruiter/selectinternshipapplication/${application.applicationId}`,
                                                    {
                                                        username: username,
                                                    },
                                                    {
                                                        headers:{
                                                            "Content-Type":"application/json",
                                                        },
                                                    }
                                                );
                                                if(response.status === 200){
                                                    const applicationDetails= applicationDiv.querySelector("p:last-child");
                                                    applicationDetails.innerHTML =`<strong>Status:</strong> selected`;
                                                }
                                            }catch(err){
                                                console.error("Error updating profile view status:", err);
                                            }
                                        };
                                        const rejectButton =document.createElement("button");
                                        rejectButton.style.padding ="5px 10px";
                                        rejectButton.style.backgroundColor="#007bff";
                                        rejectButton.style.color ="fff";
                                        rejectButton.style.border="none";
                                        rejectButton.style.borderRadius="5px";
                                        rejectButton.style.cursor="pointer";
                                        rejectButton.textContent="reject";
                                        rejectButton.onclick= async() =>{
                                            try{
                                                const response = await axios.post(`/recruiter/rejectinternshipapplication/${application.applicationId}`,
                                                    {
                                                        username:username,
                                                    },
                                                    {
                                                        headers:{
                                                            "Content-Type": "application/json",
                                                        },
                                                    }
                                                );
                                                if(response.status === 200){
                                                    const applicationDetails = applicationDiv.querySelector("p:last-child");
                                                    applicationDetails.innerHTML=`<strong>Status:</strong> rejected`;

                                                }
                                            }catch(err){
                                                console.error("Error updating profile view status:",err);
                                            }
                                        };
                                        const deleteButton = document.createElement("button");
                                        deleteButton.style.padding="5px 10px";
                                        deleteButton.style.backgroundColor="#007bff";
                                        deleteButton.style.color="#fff";
                                        deleteButton.style.border="none";
                                        deleteButton.style.borderRadius="5px";
                                        deleteButton.style.cursor="pointer";
                                        deleteButton.textContent ="delete";
                                        deleteButton.onclick =async () =>{
                                            try{
                                                const response = await axios.delete(`/recruiter/deleteinternshipapplication/${application.applicationId}/${application.appliedBy}`);
                                                if(response.status === 200){
                                                    const applicationDetails = applicationDiv.querySelector("p:last-child");
                                                    applicationDetails.innerHTML=`<strong>Status:</strong>deleted`;
                                                }
                                            }catch(err){
                                                console.error("Error deleting application:",err);
                                                if(err.response.data.messeage){
                                                alert(err.response.data.messeage);
                                                }
                                            }
                                        };
                                        if(sts !== "withdrawn"){
                                            applicationDiv.appendChild(selectButton);
                                            applicationDiv.appendChild(rejectButton);
                                        }
                                        applicationDiv.appendChild(deleteButton);
                                        modal.appendChild(applicationDiv);
                                    });
                                    document.body.appendChild(modal);
                                    const fetchStudentProfile = async (username, applicationId) =>{
                                        try{
                                            const response = await axios.get(`/student/myprofile/${username}`);
                                            const profile = response.data;
                                            const profileModal = document.createElement("div");
                                            profileModal.style.position ="fixed";
                                            profileModal.style.borderRadius="10px";
                                            profileModal.style.top="50%";
                                            profileModal.style.left ="55%";
                                            profileModal.style.transform="translate(-50%, -50%)";
                                            profileModal.style.backgroundColor="#fff";
                                            profileModal.style.padding="20px";
                                            profileModal.style.baxShadow="0 4px 8px rgba(0, 0, 0, 0.2)";
                                            profileModal.style.zIndex=1000;
                                            profileModal.style.overflowY="auto";
                                            profileModal.style.maxHeight="80vh";
                                            profileModal.style.width="80%";
                                            profileModal.style.maxWidth="600px";

                                            profileModal.innerHTML = `
                                            <div style="position:sticky; top:0; background-color: #f8f9fa;
                                            padding:10px;border-bottom:1px solid #ccc; z-index:1000;
                                            display:flex; justify-content:space-between;align-items:center;>
                                              <h3 style="margin:0;">Student Profile</h3>
                                              <button id="closeProfileButton" style="background-color:transparent;
                                              border:none;font-size:20px;cursor:pointer;">
                                              &#10005;
                                              </button>
                                            </div>
                                            <div style="padding:10px; overflow-y; auto;">
                                               <img
                                               src=${profile.image}
                                               alt="Profile"
                                               style="width:100px; height:100px; border-radius:50%;
                                               object-fit:cover; margin-bottom:10px;"
                                               />
                                               <p><strong>Application Id:</strong> ${applicationId}</p>
                                               <p><strong>Name:</strong>${profile.name}</p>
                                               <p><strong>Username:</strong>${profile.username}</p>
                                               <p><strong>Phone:</strong>${profile.mobilenumber}</p>
                                               <p><strong>skills:</strong>${profile.skills}</p>
                                               <p><strong>Education:</strong>${profile.education}</p>
                                               <p><strong>Location:</strong>${profile.location}</p>
                                            </div>
                                            `;
                                            if(profile.resume){
                                                const viewButton2 = document.createElement("button2");
                                                viewButton2.style.padding ="5px 10px";
                                                viewButton2.style.marginLeft="10px";
                                                viewButton2.style.backgroundColor="#007bff";
                                                viewButton2.style.color="#fff";
                                                viewButton2.style.border="none";
                                                viewButton2.style.borderRadius="5px";
                                                viewButton2.style.cursor="pointer";
                                                viewButton2.textContent ="download resume";
                                                viewButton2.onclick=()=> downloadResume(profile.resume);
                                                profileModal.appendChild(viewButton2);
                                            }
                                            const downloadResume =(resumeUrl) =>{
                                                const link = document.createElement("a");
                                                link.href=resumeUrl;
                                                link.download= "resume.pdf"
                                                link.click();
                                            };
                                            document.body.appendChild(profileModal);
                                            document.getElementById("closeProfileButton").onclick=()=>{
                                                document.body.removeChild(profileModal);
                                            };
                                        }catch(err){
                                            console.error("Error fetching student profile:",err);
                                            alert("Failed to fetch student profile.");
                                        }
                                    };
                                }catch(err){
                                    console.error("Error fetching application details:",err);
                                    alert("No applications found.");
                                }
                            }}
                            >
                               View Applications 
                            </button>
                            <button 
                            style={{
                                marginTop:"10px",
                                marginLeft:"10px",
                                padding:"10px 15px",
                                backgroundColor:"#dc3545",
                                color:"#fff",
                                border:"none",
                                borderRadius:"5px",
                                cursor:"pointer",
                            }}
                            onClick={async () =>{
                                if(!window.confirm("Are you sure you want to delete this internship?")){
                                    return;
                                }
                                try{
                                    const username = new URLSearchParams(window.location.search).get('username');
                                    await axios.delete(`/recruiter/deleteinternship/${job.internshipId}/${username}`);
                                    alert("Internship deleted successfully.");
                                }catch(err){
                                    console.error("Error deleting internship:",err);
                                    alert("Failed to delete internship.");
                                }
                                try{
                                    const username = new URLSearchParams(window.location.search).get('username');
                                        const response = await axios.get(`/recruiter/internshipsbyme/${username}`);
                                        setAppliedJobs(Array.isArray(response.data.data)? response.data.data:[]);

                                }catch(err){
                                        console.error("Error fetching applied Internship after deletion:",err);
                                        setAppliedJobs([]);
                                }try{
                                        const response =await axios.get(`/recruiter/allinternships`);
                                        setJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                }catch(err){
                                        console.error("Error fetching applied internships after deletion:",err);
                                        setJobs([]);
                                }
                            }}
                            >
                            delete
                            </button>
                            <button
                             style={{
                                marginTop:"10p",
                                marginLeft:"10px",
                                padding:"10px 15px",
                                backgroundColor:"#ffc107",
                                color:"#fff",
                                border:"none",
                                borderRadius:"5px",
                                cursor:"pointer",
                             }}
                             onClick={() =>{
                                const modal = document.createElement("div");
                                modal.style.background = "#fff";
                modal.style.position="fixed";
                modal.style.top="50%";
                modal.style.left="50%";
                modal.style.transform ="translate(-50%,-50%)";
                modal.style.padding="5px";
                modal.style.boxShadow= "0 4px 8px rgba(0, 0, 0, 0.2)"
                modal.style.zIndex=1050;
                modal.style.borderRadius="10px";
                modal.style.width="90%";
                modal.style.maxWidth="500px";
                modal.innerHTML=`
                <h3 style="text-align: center;margin-bottom:5px;">Update Internship</h3>
                <form id="updateJobForm" style="display:flex;flex-direction:column;gap:10px">
                  <label style="display: flex; justify-content:space-between; align-items:center;gap:10px;">
                     <span>Internship Title</span>
                     <input type="text" id ="internshipTitle" value="${job.internshipTitle}" required style="flex:1;
                     padding:5px;border:1px solid #ccc; border-radius:5px;"/>
                  </label>
                  <label style="display:flex; justify-content:space-between;align-items:center;">
                    <span>Internship Description</span>
                    <textarea id="internshipDescription" required style="flex:1; padding:5px;
                    border:1px solid #ccc; border-radius:5px;">${job.internshipDescription}</textarea>
                  </label>
                  <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Location</span>
                    <input type="text " id="location" value="${job.location}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                  </label>
                <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Website Website</span>
                    <input type="text " id="companyWebsite" value="${job.companyWebsite}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                </label>
                 <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Company Name</span>
                    <input type="text " id="companyName" value="${job.companyName}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                </label>
                <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Stipend</span>
                    <input type="text " id="stipend" value="${job.stipend}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                </label>
                <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Start Date</span>
                    <input type="text " id="startDate" value="${job.startDate}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                  </label>
                <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>End Date</span>
                    <input type="text " id="endDate" value="${job.endDate}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                  </label>
                <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Skills Required</span>
                    <input type="text " id="skillsRequired" value="${job.skillsRequired}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                  </label>
                   <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Education Required</span>
                    <input type="text " id="educationRequired" value="${job.educationRequired}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                  </label>
                <label style="display:flex; justify-content:space-between;align-items:center;gap:10px">
                    <span>Application Deadline</span>
                    <input type="text " id="applicationDeadline" value="${job.applicationDeadline}"required style="flex: 1;
                    padding:5px; border:1px solid #ccc; border-radius:5px;"/>
                </label>
                <div style="display: flex; justify-content:space-between;gap:10px;">
                <button type="submit" style="flex: 1; padding:5px; background-color: #007bff; color:#fff;border:none;border-radius:5px; cursor:pointer;">Update</button>
                <button type="button" id="cancelButton" style="flex:1; padding:5px; background-color: #6c757d;color:#fff; border:none;border-radius:5px;cursor:pointer;">Cancel</button>
                </div>
                </form>
                `;
                document.body.appendChild(modal);
                document.getElementById("cancelButton").onclick = () => {
                    document.body.removeChild(modal);
                };
                document.getElementById("updateJobForm").onsubmit =async(e) =>{
                    e.preventDefault();
                    const username = new URLSearchParams(window.location.search).get('username');
                    const jobData ={
                        recruiterUsername :username,
                        internshipId:job.internshipId,
                        internshipTitle:document.getElementById("internshipTitle").value,
                        internshipDescription:document.getElementById("internshipDescription").value,
                        location:document.getElementById("location").value,
                        companyName:document.getElementById("companyName").value,
                        companyWebsite:document.getElementById("companyWebsite").value,
                        stipend:document.getElementById("stipend").value,
                        startDate:document.getElementById("startDate").value,
                        endDate:document.getElementById("endDate").value,
                        skillsRequired:document.getElementById("skillsRequired").value,
                        datePosted:new Date().toISOString().split("T")[0],
                        applicationDeadline:document.getElementById("applicationDeadline").value,
                        educationRequired:document.getElementById("educationRequired").value,

                    };
                    try{
                        console.log("Internship Date:", jobData);
                       await axios.put("/recruiter/updateinternship",jobData,{
                        headers:{
                            "Content-Type":"application/json",
                        },
                       }) ;
                       alert("Intrnship updated successfully !");
                       document.body.removeChild(modal);
                }catch(err){
                    console.error("Error adding job:", err);
                    alert("Failed to update job.");
                }
                try{
                    const response = await axios.get(`/recruiter/allinternships`);
                    setJobs(Array.isArray(response.data.data)? response.data.data:[]);
                }catch(err){
                    console.error("Error fetching internships after updating internship:", err);
                    setJobs([]);
                }
                try{
                    const response = await axios.get(`/recruiter/internshipsbyme/${username}`);
                    setAppliedJobs(Array.isArray(response.data.data)?response.data.data: []);
                }catch(err){
                    console.error("Error fetching applied internships after adding internship:", err);
                    setAppliedJobs([]);
                }
            
                };
                   }}
                            >
                            Update
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