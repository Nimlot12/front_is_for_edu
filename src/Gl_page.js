import React from "react";
import './style_auth.css';
import logo from './logo.jpg';
import NavBar from "./NavBar";
import Header from "./Header";
import {useUser} from "./UserContext";



const GlPage = () => {
    const { user, setUser } = useUser(); 
  return (
    <div className="dashboard-container">
    <NavBar user = {user} setUser = {setUser}/>
    <main className="main-content">
        <Header user = {user}/>
        <div className="dashboard-grid">
            <div className="dashboard-card">
                <h3>Последние занятия</h3>
                <ul className="recent-lessons">
                    <li>
                        <span className="lesson-subject">Математика</span>
                        <span >Вчера, 16:00</span>
                    </li>
                    <li>
                        <span className="lesson-subject">Английский язык</span>
                        <span >Позавчера, 14:30</span>
                    </li>
                </ul>
            </div>
            <div className="dashboard-card">
                <h3>Предстоящие занятия</h3>
                <ul className="upcoming-lessons">
                    <li>
                        <span className="lesson-subject">Физика</span>
                        <span >Завтра, 15:00</span>
                    </li>
                    <li>
                        <span className="lesson-subject">Химия</span>
                        <span >Послезавтра, 17:30</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</div>
  );
};

export default GlPage;