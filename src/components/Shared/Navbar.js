import React from "react";

const Navbar = ()=> {
    const handleLogout =()=>{
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/';
    };
    const handleProfile= ()=>{
        let userType = localStorage.getItem('usertype');
        let username = localStorage.getItem('username');
        if (userType === 'recruiter'){
            window.location.href= `/recruiterprofile?username=${encodeURIComponent(username)}`;
        } else if (userType === 'student'){
            window.location.href= `/studentprofile?username=${encodeURIComponent(username)}`;
        }
    };
    const handleJobs = ()=> {
        let userType = localStorage.getItem('usertype');
        let username = localStorage.getItem('username');
        if (userType === 'recruiter'){
            window.location.href= `/viewalljobs?username=${encodeURIComponent(username)}`;
        } else if (userType === 'student'){
            window.location.href= `/viewjobs?username=${encodeURIComponent(username)}`;
        }
    };
    const handleInternships = ()=> {
        let userType = localStorage.getItem('usertype');
        let username = localStorage.getItem('username');
        if (userType === 'recruiter'){
            window.location.href= `/viewallinternships?username=${encodeURIComponent(username)}`;
        } else if (userType === 'student'){
            window.location.href= `/viewinternships?username=${encodeURIComponent(username)}`;
        }
    };
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    return(
        <nav style={{padding:"0", margin:"0"}}>
            <ul style={{display:"flex", alignItems:"center", listStyle:"none", margin:0, padding:0, minHeight:"32px"}}>
                {isAuthenticated && (
                    <>
                    <li><span style={{margin:"0 10px"}}></span></li>
                    <li>
                        <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                            background:"none",
                            border:"none",
                            color:"blue",
                            textDecoration:"underline",
                            cursor:"pointer",
                            padding:0,
                            font:"inherit",
                            lineHeight:"1"
                        }}
                        >
                            Logout
                        </button>
                    </li>
                    <li><span style={{margin:"0 10px"}}></span></li>
                    <li>
                        <button
                        type="button"
                        onClick={handleProfile}
                        style={{
                            background:"none",
                            border:"none",
                            color:"blue",
                            textDecoration:"underline",
                            cursor:"pointer",
                            padding:0,
                            font:"inherit",
                            lineHeight:"1"
                        }}
                        >
                            Profile
                        </button>
                    </li>
                    <li><span style={{margin:"0 10px"}}></span></li>
                    <li>
                        <button
                        type="button"
                        onClick={handleJobs}
                        style={{
                            background:"none",
                            border:"none",
                            color:"blue",
                            textDecoration:"underline",
                            cursor:"pointer",
                            padding:0,
                            font:"inherit",
                            lineHeight:"1"
                        }}
                        >
                            Jobs
                        </button>
                    </li>
                    <li><span style={{margin:"0 10px"}}></span></li>
                    <li>
                        <button
                        type="button"
                        onClick={handleInternships}
                        style={{
                            background:"none",
                            border:"none",
                            color:"blue",
                            textDecoration:"underline",
                            cursor:"pointer",
                            padding:0,
                            font:"inherit",
                            lineHeight:"1"
                        }}
                        >
                            Internships
                        </button>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;