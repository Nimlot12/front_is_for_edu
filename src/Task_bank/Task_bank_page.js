import { useUser } from "../UserContext";
import NavBar from "../NavBar";
import Header from "../Header";
import '../style_auth.css';
import Filtr from "./Filtr";
import Tasks_list from "./Tasks_list";
import React, { useState } from "react";


const Task_bank_page = () => {
    const {user, setUser} = useUser();
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [filter, setFilter] = useState({ theme: null, taskType: '' });
    return (
        <div className="dashboard-container">
            <NavBar user={user} setUser={setUser}/>
            <main className="main-content">
                <Header user={user}/>
                <div className="task-bank-container">
                <Filtr onThemeSelect={(data) => setFilter(data)}/>
                <Tasks_list selectedTheme={filter.theme} selectedTaskType={filter.taskType}/>
                </div>
            </main>
        </div>
    );

};
export default Task_bank_page;