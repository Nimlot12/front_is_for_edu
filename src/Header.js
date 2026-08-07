import './styles/header.scss';
import { NavLink } from "react-router-dom";



const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";



const Header = ({user}) => {
    return (
    <header className="header">
            <h1>Добро пожаловать, {user ? `${user.first_name} ${user.last_name}` : "Стоп, а ты кто?"}</h1>
            <div className="header__actions">
                <input type="search" placeholder="Поиск..." className="search-input"/>
                <div className="header__profile">
                    <NavLink to="/messenger"
                             className={({ isActive }) =>
                                 `header__profile-link header__profile-link--messenger ${isActive ? 'header__profile-link--active' : ''}`
                             }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" w-tid="91">
                            <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" w-tid="93"></path>
                            <path d="M7 8h10M7 12h6" w-tid="95"></path>
                        </svg>
                    </NavLink>
                    <NavLink to="/personal_room"
                             className={({ isActive }) =>
                                 `header__profile-link ${isActive ? 'header__profile-link--active' : ''}`
                             }>
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