import react from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import { NavLink, useNavigate } from "react-router-dom";


const Admin_grid = () => {
    return(
        <div className="admin-grid">
                <div className="admin-card">
                    <NavLink to="/lead_page/Admin_page/users" className="admin-card-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>Пользователи</span>
                    </NavLink>
                </div>
                <div className="admin-card">
                    <NavLink to="/lead_page/Admin_page/roles" className="admin-card-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <polyline points="17 11 19 13 23 9"></polyline>
                        </svg>
                        <span>Роли</span>
                    </NavLink>
                </div>
                <div className="admin-card">
                    <NavLink to="/lead_page/Admin_page/permissions" className="admin-card-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Доступы</span>
                    </NavLink>
                </div>
                <div className="admin-card">
                    <a href="#" className="admin-card-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="12" y1="13" x2="12" y2="17"></line>
                            <line x1="12" y1="9" x2="12" y2="11"></line>
                        </svg>
                        <span>Логи</span>
                    </a>
                </div>
            </div>
    );
};
export default Admin_grid;