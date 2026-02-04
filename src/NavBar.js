import logo from './logo.jpg';
import './style_auth.css';
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";



const NavBar = ({user, setUser}) => {

    const [activeTab, setActiveTab] = useState("lead");
    const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

    const handleLogout = async () => {
        await fetch(`${API_URL}/auth/logout/`, {
          method: "POST",
          credentials: "omit",
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });
        setUser(null);
        navigate("/");
      };

    const navigate = useNavigate();

    const handleAdminSubmit = async (e) => {
    e.preventDefault();

    navigate("/Admin_page");
    };

    return (
        <nav className="sidebar">
        <div className="logo-container">
            <img src={logo} alt="SchoolDOT Logo" className="logo"/>
        </div>
        <ul className="nav-menu">
            <li className="nav-item">
                <NavLink to="/lead_page" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Главная</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/lead_page/teach_panel" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <polyline points="17 11 19 13 23 9"></polyline>
                    </svg>
                    <span>Репетиторская</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/lead_page/child" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 11c-2.209 0-4-1.791-4-4V4c0-2.209 1.791-4 4-4s4 1.791 4 4v3c0 2.209-1.791 4-4 4zM14 12h-4C6.686 12 4 14.686 4 18v4h16v-4c0-3.314-2.686-6-6-6z"></path>
                    </svg>
                    <span>Ученики</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/lead_page/schedule" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Расписание</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/lead_page/notice" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span>Уведомления</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/lead_page/Admin_page" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Admin-панель</span>
                </NavLink>
            </li>
        </ul>
        <div className="nav-footer">
            <a href="#" className="nav-link logout" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Выход</span>
            </a>
        </div>
    </nav>
    );
};

export default NavBar;