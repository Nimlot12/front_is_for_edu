import react, { useEffect, useState } from "react"
import './style_auth.css';
import { NavLink, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


const Header = ({user}) => {
    console.log("Данные пользователя в Header:", user);
    return (
    <header className="main-header">
            <h1>Добро пожаловать, {user ? `${user.first_name} ${user.last_name}` : "Стоп, а ты кто?"}</h1>
            <div className="header-actions">
                <input type="search" placeholder="Поиск..." className="search-input"/>
                <div className="user-profile">
                    <NavLink to="/personal_room" className={({ isActive }) => isActive ? "profile-link active" : "profile-link"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </NavLink>
                    <img src={user?.avatar_path ? `${API_URL}/${user.avatar_path}` : `${API_URL}/static/avatars/default_avatar.png`} alt="Аватар пользователя" className="avatar"/>
                </div>
            </div>
        </header>
    );
};
export default Header;