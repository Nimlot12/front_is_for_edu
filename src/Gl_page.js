import React from "react";
import './styles/gl-page.scss';
import NavBar from "./NavBar";
import Header from "./Header";
import {useUser} from "./UserContext";



const GlPage = () => {
    const { user, setUser } = useUser(); 
  return (
    <div className="dashboard">
    <NavBar user = {user} setUser = {setUser}/>
    <main className="dashboard__content">
        <Header user = {user}/>
        <div className="dashboard__grid">
            <div className="dashboard-card">
                <h3>Последние занятия</h3>
                <ul className="lesson-list lesson-list--recent">
                    <li className="lesson-list__item">
                        <span className="lesson-list__subject">Математика</span>
                        <span className="lesson-list__time">Вчера, 16:00</span>
                    </li>
                    <li className="lesson-list__item">
                        <span className="lesson-list__subject">Английский язык</span>
                        <span className="lesson-list__time">Позавчера, 14:30</span>
                    </li>
                </ul>
            </div>
            <div className="dashboard-card">
                <h3>Предстоящие занятия</h3>
                <ul className="lesson-list lesson-list--upcoming">
                    <li className="lesson-list__item">
                        <span className="lesson-list__subject">Физика</span>
                        <span className="lesson-list__time">Завтра, 15:00</span>
                    </li>
                    <li className="lesson-list__item">
                        <span className="lesson-list__subject">Химия</span>
                        <span className="lesson-list__time">Послезавтра, 17:30</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</div>
  );
};

export default GlPage;