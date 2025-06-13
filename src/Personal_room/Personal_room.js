
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Avatar from "./Avatar";
import Profile_details from "./Profile_details";
import react, { useState, useEffect } from "react";
import { useUser } from "../UserContext";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Personal_room = () => {
    const { user, setUser } = useUser(); 
    return(
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div className="profile-content">
                    <Avatar user={user} setUser={setUser}/>
                    <Profile_details/>
                </div>
            </main>
        </div>
    );
};
export default Personal_room;