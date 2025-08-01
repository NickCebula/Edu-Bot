import React from "react";
import { useNavigate } from "react-router-dom"; 
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";
import handleLogout from "../components/NavBar"

export default function ParentView() { 
let username = localStorage.getItem('username');   // returns null if not set

    return (
        <>
        <Dropdown
            label="Account"
            items={[
                { id: 'profile', label: 'Profile', onClick: () => nav('/profile') },
                { id: 'logout',  label: 'Sign out', onClick: { handleLogout } },
            ]}
        />

        <div className="parent-view-container">
            <h2>Parent View</h2>
            <p>Welcome to the Parent View. Here you can monitor your child's progress and access various features.</p>
            {/* Additional content can be added here */}
        </div>
        </>
    );
}


 
