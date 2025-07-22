import React,{useEffect,useState}from "react";
import axios from"axios";
const ViewJobs = () =>{
    const [jobs, setJobs] = useState([]);
    const[error, setError] = useState("");
    const[appliedJobs,setAppliedJobs] =useState([]);
    const[appliedError, setAppliedError] =useState("");
        useEffect(() =>{
            if(localStorage.getItem('isAuthenticated') !== 'true'){
                window.location.href ='/login';
            }
        },[]);
        useEffect(() =>{
            const fetchJobs = async () =>{
                try{
                    const response = await axios.get("/recruiter/alljobs");
                    console.log("response:",response.data);
                    setJobs(Array.isArray(response.data.data)? response.data.data: []);
                }catch(error){
                    setError(error.response.data.error || "");
                }
            };
            fetchJobs();
        },[]);
        useEffect(() =>{
            const fetchAppliedJobs = async() =>{
                try{
                    let username = new URLSearchParams(window.location.search).get('username');
                    console.log("username:", username);
                    const response = await axios.get(`/recruiter/jobsbyme/${username}`);
                    setAppliedJobs(Array.isArray(response.data.data) ? response.data.data: []);
                }catch(error){
                    console.error("Error fetching applied jobs:",error);
                    setAppliedError(error.response?.data?.error || "");
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
                    borderRight :"1px solid #ccc",
                    overflowY:"auto",
                }}
                >
                    <div
                    style={{
                        position:"sticky",
                        top:0,
                        backgroundColor:"10px",
                        borderBottom:"1px solid #ccc",
                        zIndex:1000,
                    }}
                    >
                        <h2>Available Jobs</h2>
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
                                {jobs.map((job) => (
                                    <li
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
                                    <strong>jobId:</strong>{job.jobId}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Company:</strong>{job.companyName}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Recruiter:</strong>{job.recruiterUsername}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Location:</strong>{job.location}
                                </p>                       
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Salary</strong>{job.salaryRange}
                                </p>                               
                                <p style={{marginBottom:"10px"}}>
                                    <strong>skillsRequired:</strong>{job.skillsRequired}
                                </p>  
                                <p style={{marginBottom:"10px"}}>
                                    <strong>educationRequired:</strong>{job.educationRequired}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Experience Required:</strong>{job.experienceRequired}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>Application Deadline:</strong>{job.applicationDeadline}
                                </p>
                                <p style={{marginBottom:"10px"}}>
                                    <strong>JobType:</strong>{job.jobType}
                                </p>
                               <p style={{marginBottom:"10px"}}>
                                    <strong>datePosted:</strong>{job.datePosted}
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
                                    <strong>Description:</strong>{job.jobDescription}
                                </p>
                                </li>
                        ))}
                            </ul>
                        )}
                    </div>
                </div>
                {/* Right Half: Applied Jobs*/}
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
                        alignItems:"content",
                    }}
                    >
                        <h2>Jobs By Me</h2>
                        <button
                         onClick={() =>{
                            const modal = document.createElement("div");
                            modal.style.position="fixed";
                            modal.style.top="50%";
                            modal.style.left="50%";
                            modal.style.transform="translate(-50%,-50%)";
                            modal.style.backgroundColor="#fff";
                            modal.style.padding="5px";
                            modal.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)";
                            modal.style.zIndex=1050;
                            modal.style.borderRadius="10px";
                            modal.style.width="90%";
                            modal.style.maxWidth="500px";
                            modal.innerHTML=`
                            <h3 style="text-align:center; margin-bottom:5px;">Add Job</h3>
                            <form id="addJobForm" style="display:flex; flex-direction:column;gap:10px;">
                             <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Job Title</span>
                              <input type="text" id="jobTitle" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                             <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Job Description</span>
                              <input type="text" id="jobDescription" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                             <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Location</span>
                              <input type="text" id="location" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Company Website</span>
                              <input type="text" id="companyWebsite" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Company Name</span>
                              <input type="text" id="companyName" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Salary Range</span>
                              <input type="text" id="salaryRange" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                             <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Job Type</span>
                              <input type="text" id="jobType" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Experience Required</span>
                              <input type="text" id="experienceRequired" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Skills Required</span>
                              <input type="text" id="skillsRequired" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                              <span>Education Required</span>
                              <input type="text" id="educationRequired" required style ="flex:1;padding:5px;
                              border:1px solid #ccc; border-radius:5px;"/>                              
                             </label>
                            <label style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                              <span>Application Deadline</span>
                              <input type="text" id="applicationDeadline" required style ="flex:1;padding:5px;border:1px solid #ccc; border-radius:5px;"/>                              
                            </label>
                            <div style="display:flex;justify-content:space-between;align-items:center; gap:10px;">
                            <button type="submit" style="flex:1;padding:5px;background-color: #007bff ;color:#fff;border:none; border-radius:5px;cursor:pointer;">Submit</button>
                            <button type="button" id="cancelButton" style="flex:1; padding:5px; background-color: #6c757d ;color:#fff;border:none;border-radius:5px; cursor:pointer;">Cancel</button>
                             </div>
                             </form>
                            `;
                            document.body.appendChild(modal);
                            document.getElementById("cancelButton").onclick=() =>{
                            document.body.removeChild(modal);
                            };
                            document.getElementById("addJobForm").onsubmit = async(e)=>{
                                e.preventDefault();
                                const username = new URLSearchParams(window.location.search).get('username');
                                console.log("username:"+username);
                                const jobData ={
                                    recruiterUsername :username,
                                    jobTitle:document.getElementById("jobTitle").value,
                                    jobDescription:document.getElementById("jobDescription").value,
                                    location:document.getElementById("location").value,
                                    companyName:document.getElementById("companyName").value,
                                    companyWebsite:document.getElementById("companyWebsite").value,
                                    salaryRange:document.getElementById("salaryRange").value,
                                    jobType:document.getElementById("jobType").value,
                                    experienceRequired:document.getElementById("experienceRequired").value,
                                    skillsRequired:document.getElementById("skillsRequired").value,
                                    educationRequired:document.getElementById("educationRequired").value,
                                    datePosted:new Date().toISOString().split("T")[0],
                                    applicationDeadline:document.getElementById("applicationDeadline").value,
                                };
                                try{
                                    await axios.post("/recruiter/addjob",jobData,{
                                        headers:{
                                            "Content-Type":"application/json",
                                        },
                                    });
                                    alert("job added successfully!");
                                    document.body.removeChild(modal);
                                    const response = await axios.get(`/recruiter/alljobs`);
                                    setJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                }catch(err){
                                    console.error("Error adding job:",err);
                                    alert("Failed to add job.");
                                }
                                try{
                                    const response = await axios.get(`/recruiter/jobsbyme/${username}`);
                                    setAppliedJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                }catch(err){
                                    console.error("error fetching applied after adding job:",err);
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
                        >
                            Add Job
                        </button>
                        {error && <p style={{color:"red",marginBottom:"10px"}}>{error}</p>}
                    </div>
                    <div
                        style={{
                            flex:1,
                            padding:"10px",
                            backgroundColor:"#ffffff",
                        }}
                    >
                        {appliedJobs.length === 0 && !error ? (
                            <p style={{marginBottom:"10px"}}>No Posted Jobs.</p>
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
                                       key={job.jobId}
                                       style={{
                                        border:"1px solid #ccc",
                                        borderRadius:"5px",
                                        padding:"10px",
                                        maxWidth:"600px",
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
                                             <strong>Location:</strong>{job.location}
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>Salary:</strong>{job.salaryRange}
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>skillsRequired:</strong>{job.skillsRequired}
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>Education Required:</strong>{job.educationRequired}
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>experienceRequired:</strong>{job.experienceRequired}
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>Application Deadline:</strong>{job.applicationDeadline}
                                          <p style={{marginBottom:"10px"}}>
                                             <strong>JobType:</strong>{job.jobType}
                                        </p>
                                      </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>Date Posted:</strong>{job.datePosted}
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                             <strong>Company Website:</strong>{""}
                                             <a
                                               href={job.companyWebsite}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                             >
                                                {job.companyWebsite}
                                             </a>
                                        </p>
                                        <p style={{marginBottom:"10px"}}>
                                            <strong>Description</strong>{job.jobDescription}
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
                                                const response = await axios.post(`/recruiter/applicationsforjob`,
                                                    {
                                                        jobId:job.jobId,
                                                        recruiterUsername:username,
                                                    },
                                                    {
                                                        headers:{
                                                            "Content-Type":"application/json",
                                                        }
                                                    }
                                                );
                                        const applicationData = response.data.data;
                                        const modal = document.createElement("div");
                                        modal.style.position="fixed";
                                        modal.style.top="50%";
                                        modal.style.left="50%";
                                        modal.style.transform="translate(-50%,-50%)";
                                        modal.style.backgroundColor="#fff";
                                        modal.style.padding="20px";
                                        modal.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)";
                                        modal.style.zIndex=1000;
                                        modal.style.overflowY="auto";
                                        modal.style.maxHeight="80vh";
                                        modal.style.borderRadius="10px";
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
                                        headerTitle.textContent="Applications Details";

                                        const closeButton = document.createElement("button");
                                        closeButton.style.backgroundColor="transparent";
                                        closeButton.style.border="none";
                                        closeButton.style.fontSize="20px";
                                        closeButton.style.cursor="pointer";
                                        closeButton.innerHTML = "&#10005";
                                        closeButton.onclick=()=> document.body.removeChild(modal);

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
                                            applicationDiv.style.alignItems="center";

                                            const applicationDetails = document.createElement("div");
                                            let sts = application.status;
                                            applicationDetails.innerHTML=`
                                            <p><strong>Application Id:</strong>${application.applicationId}</p>
                                            <p><strong>Applied By:</strong> ${application.appliedBy}</p>
                                            <p><strong>Applied time</strong>${application.appliedTime}</p>
                                            <p><strong>Status:</strong>${application.status}</p>
                                            `;
                                            const viewButton = document.createElement("button");
                                            viewButton.style.padding="5px 10px";
                                            viewButton.style.backgroundColor="#007bff";
                                            viewButton.style.color="#fff";
                                            viewButton.style.border="none";
                                            viewButton.style.borderRadius="5px";
                                            viewButton.style.cursor="pointer";
                                            viewButton.textContent="view";
                                            viewButton.onclick =async()=>{
                                                await fetchStudentProfile(application.appliedBy, application.applicationId);
                                                try{
                                                    const response = await axios.post(`/recruiter/viewjobapplication/${application.applicationId}`,
                                                        {
                                                            username:username,
                                                        },
                                                        {
                                                            headers:{
                                                                "Content-Type":"application/json",
                                                            },
                                                        }
                                                    );
                                                    if(response.status === 200){
                                                        let responseStatus = response.data.data[0].status;
                                                        //console.log("view data:")
                                                        //console.log(response);
                                                        const applicationDetails = applicationDiv.querySelector("p:last-child");
                                                        applicationDetails.innerHTML =`<strong>Status:</strong>${responseStatus}`;
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
                                            selectButton.textContent="select";
                                            selectButton.onclick = async()=>{
                                                try{
                                                    const response =await axios.post(`/recruiter/selectjobapplication/${application.applicationId}`,
                                                        {
                                                            username:username,
                                                        },
                                                        {
                                                            headers:{
                                                                "Content-Type":"application/json",
                                                            },
                                                        }
                                                    );
                                                    if(response.status ===200){
                                                        const applicationDetails = applicationDiv.querySelector("p:last-child");
                                                        applicationDetails.innerHTML=`<strong>Status:</strong>selected`;
                                                    }
                                                }catch(err){
                                                    console.error("Error updating profile view status:",err);
                                                }
                                            };
                                            const rejectButton = document.createElement("button");
                                            rejectButton.style.padding="5px 10px";
                                            rejectButton.style.backgroundColor="#007bff";
                                            rejectButton.style.color="#fff";
                                            rejectButton.style.border="none";
                                            rejectButton.style.borderRadius="5px";
                                            rejectButton.style.cursor="pointer";
                                            rejectButton.textContent="reject";
                                            rejectButton.onclick=async()=>{
                                                try{
                                                    const response = await axios.post(`/recruiter/rejectjobapplication/${application.applicationId}`,
                                                        {
                                                            username:username,
                                                        },
                                                        {
                                                            headers:{
                                                                "Content-Type":"application/json",
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
                                            deleteButton.textContent="delete";
                                            deleteButton.onclick =async()=>{
                                                try{
                                                    const response = await axios.delete(`/recruiter/deletejobapplication/${application.applicationId}/${application.appliedBy}`);
                                                    if(response.status === 200){
                                                        const applicationDetails = applicationDiv.querySelector("p:last-child");
                                                        applicationDetails.innerHTML =`<strong>Status:</strong>deleted`;
                                                    }
                                                }catch(err){
                                                    console.error("Error deleting application:",err);
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
                                        const fetchStudentProfile = async(username, applicationId)=>{
                                            try{
                                                const response = await axios.get(`/student/myprofile/${username}`);
                                                const profile = response.data;
                                                const profileModal = document.createElement("div");
                                                profileModal.style.position ="fixed";
                                                profileModal.style.borderRadius="10px";
                                                profileModal.style.top="50%";
                                                profileModal.style.left="55%";
                                                profileModal.style.transform="translate(-50%,-50%)";
                                                profileModal.style.backgroundColor="#fff";
                                                profileModal.style.padding="20%";
                                                profileModal.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)";
                                                profileModal.style.zIndex=1000;
                                                profileModal.style.overflowY="auto";
                                                profileModal.style.maxHeight="80vh";
                                                profileModal.style.width="80%";
                                                profileModal.style.maxWidth="600px";
                                                profileModal.innerHTML=`
                                                 <div style="position: sticky; top:0;background-color: #f8f9fa;
                                                 padding:10px; border-bottom:1px solid #ccc;z-index;1000;
                                                 display:flex; justify-content:space-between;align-items:center;">
                                                   <h3 style="margin:0;">Student Profile</h3>
                                                   <button id="closeProfileButton" style="background-color: transparent;
                                                   border:none; font-size:20px; cursor:pointer;">
                                                   &#10005</button>
                                                 </div>
                                                 <div style="padding:10px; overflow-y:auto;">
                                                 <img
                                                     src=${profile.image}
                                                     alt="position"
                                                     style="width:100px;height:100px; border-radius:50%;
                                                     object-fit:cover;margin-bottom:10px;"
                                                     />
                                                     <p><strong>Application ID:</strong>${applicationId}</p>
                                                     <p><strong>Name :</strong>${profile.name}</p>
                                                     <p><strong>Username :</strong>${profile.username}</p>
                                                     <p><strong>phone:</strong>${profile.mobilenumber}</p>
                                                     <p><strong>Skills:</strong>${profile.skills}</p>
                                                     <p><strong>Education :</strong>${profile.education}</p>
                                                     <p><strong>Location:</strong>${profile.location}</p>
                                                 </div>
                                                `;
                                                if(profile.resume){
                                                    const viewButton2 = document.createElement("button2");
                                                    viewButton2.style.padding="5px 10px";
                                                    viewButton2.style.marginLeft="10px";
                                                    viewButton2.style.backgroundColor="#007bff";
                                                    viewButton2.style.color="#fff";
                                                    viewButton2.style.border="none";
                                                    viewButton2.style.borderRadius="5px";
                                                    viewButton2.style.cursor="pointer";
                                                    viewButton2.textContent="download resume";
                                                    viewButton2.onclick =() =>downloadResume(profile.resume);
                                                    profileModal.appendChild(viewButton2);
                                                }
                                                const downloadResume =(resumeUrl) =>{
                                                    const link = document.createElement("a");
                                                    link.href=resumeUrl;
                                                    link.download="resume.pdf";
                                                    link.click();
                                                };
                                                document.body.appendChild(profileModal);
                                                document.getElementById("closeProfileButton").onclick =()=>{
                                                    document.body.removeChild(profileModal);
                                                }
                                                
                                            }catch(err){
                                                console.error("Error fetching student profile:",err);
                                                alert("Failed to fetch student profile.");
                                            }
                                        };
                                    }catch(err){
                                        console.error("Error fetching application details:",err);
                                                alert("No application found.");
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
                                        
                                            onClick={async() =>{
                                                if(!window.confirm("Are you sure you want to delete this job?")){
                                                    return;
                                                }
                                                try{
                                                    const username = new URLSearchParams(window.location.search).get('username');
                                                    await axios.delete(`/recruiter/deletejob/${job.jobId}/${username}`,);
                                                    alert("job deleted successfully.");
                                                }catch(err){
                                                    console.error("Error deleting job:",err);
                                                    alert("Failed to delete job.");
                                                }
                                                try{
                                                    const username =  new URLSearchParams(window.location.search).get('username');
                                                    const response = await axios.get(`/recruiter/jobsbyme/${username}`);
                                                    setAppliedJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                                }catch(err){
                                                    console.error("Error fetching applied jobs after deletion:", err);
                                                    setAppliedJobs([]);
                                                }
                                                try{
                                                    const response = await axios.get(`/recruiter/alljobs`);
                                                    setJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                                }catch(err){
                                                    console.error("Error fetching applied jobs after deletion:",err);
                                                    setJobs([]);
                                                }
                                            }}
                                            >
                                            delete
                                        </button>
                                        <button
                                            style={{
                                                marginTop:"10px",
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
                                                modal.style.position="fixed";
                                                modal.style.top="50%";
                                                modal.style.left="50%";
                                                modal.style.transform="translate(-50%,-50%)";
                                                modal.style.backgroundColor="#fff";
                                                modal.style.padding="5px";
                                                modal.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)";
                                                modal.style.zIndex=1050;
                                                modal.style.borderRadius="10px";
                                                modal.style.width="90%";
                                                modal.style.maxWidth="500px";
                                                modal.innerHTML=`
                                                   <h3 style="text-align: center; margin-bottom:5px;">Update Jobs</h3>
                                                   <form id="updateJobForm" style="display:flex;flex-direction:column;gap:10px;">
                                                      <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Job Title</span>
                                                       <input type="text" id="jobTitle" value="${job.jobTitle}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                     <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Job Description</span>
                                                       <textarea id="jobDescription" required style="flex:1; padding:5px;
                                                       border:1px solid #ccc; border-radius:5px;">${job.jobDescription}</textarea>
                                                      </label>

                                                     <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Location</span>
                                                       <input type="text" id="location" value="${job.location}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                     <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Company Website</span>
                                                       <input type="text" id="companyWebsite" value="${job.companyWebsite}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                       <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Company Name</span>
                                                       <input type="text" id="companyName" value="${job.companyName}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                      <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Salary Range</span>
                                                       <input type="text" id="salaryRange" value="${job.salaryRange}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>
 
                                                       <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Job Type</span>
                                                       <input type="text" id="jobType" value="${job.jobType}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                      <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Experience Required</span>
                                                       <input type="text" id="experienceRequired" value="${job.experienceRequired}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                      <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Skills Required</span>
                                                       <input type="text" id="skillsRequired" value="${job.skillsRequired}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                      <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Education Required</span>
                                                       <input type="text" id="educationRequired" value="${job.educationRequired}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>

                                                       <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                                                       <span>Application Deadline</span>
                                                       <input type="text" id="applicationDeadline" value="${job.applicationDeadline}" required style="flex:1;
                                                       padding:5px; border: 1px solid #ccc; border-radius:5px;"/>
                                                      </label>
                                                      
                                                      <div style="display:flex;justify-content:space-between;gap:10px;">
                                                         <button type="submit" style="flex:1;padding:5px;background-color: #007bff;color:#fff;border:none;border-radius:5px;cursor:pointer;">Update</button>
                                                         <button type="button" id="cancelButton" style="flex:1;padding:5px; background-color: #6c757d; color: #fff; border:none; border-radius:5px;cursor:pointer;">Cancel</button>
                                                      </div>
                                                  </form>
                                                `;
                                                document.body.appendChild(modal);
                                                document.getElementById("cancelButton").onclick = () => {
                                                    document.body.removeChild(modal);
                                                };
                                                document.getElementById("updateJobForm").onsubmit = async(e)=>{
                                                    e.preventDefault();
                                                    const username = new URLSearchParams(window.location.search).get('username');
                                                    console.log("username:"+username);
                                                    const jobData ={
                                                        recruiterUsername : username,
                                                        jobId:job.jobId,
                                                        jobTitle:document.getElementById("jobTitle").value,
                                                        jobDescription:document.getElementById("jobDescription").value,
                                                        location:document.getElementById("location").value,
                                                        companyWebsite:document.getElementById("companyWebsite").value,
                                                        companyName:document.getElementById("companyName").value,
                                                        salaryRange:document.getElementById("salaryRange").value,
                                                        jobType:document.getElementById("jobType").value,
                                                        experienceRequired:document.getElementById("experienceRequired").value,
                                                        skillsRequired:document.getElementById("skillsRequired").value,
                                                        educationRequired:document.getElementById("educationRequired").value,
                                                        datePosted: new Date().toISOString().split("T")[0],
                                                        applicationDeadline:document.getElementById("applicationDeadline").value,

                                                    };
                                                    try{
                                                        console.log("job Data:", jobData);
                                                        await axios.put("/recruiter/updatejob", jobData,{
                                                            headers:{
                                                                "Content-Type":"application/json",
                                                            },
                                                        });
                                                        alert("job updated successfully");
                                                        document.body.removeChild(modal);
                                                    }catch(err){
                                                        console.error("Error adding job:", err);
                                                        alert("Failed to update job.");
                                                    }
                                                    try{
                                                        const response = await axios.get(`/recruiter/alljobs`);
                                                        setJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                                    }catch(err){
                                                        console.error("Error fetching jobs after updating job:",err);
                                                        setJobs([]);
                                                    }
                                                    try{
                                                        const response = await axios.get(`/recruiter/jobsbyme/${username}`);
                                                        setAppliedJobs(Array.isArray(response.data.data)? response.data.data:[]);
                                                    }catch(err){
                                                        console.error("Error fetching applied jobs after adding job:",err);
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

export default ViewJobs;