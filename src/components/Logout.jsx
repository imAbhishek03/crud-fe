import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { doLogout, isLoggedIn } from '../auth';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logging out::");
        
        doLogout();

        navigate("/")
    };
  
    return <>
        {isLoggedIn() ? <button onClick={handleLogout}>Logout</button> : <div></div>}
    </>;
}

export default Logout