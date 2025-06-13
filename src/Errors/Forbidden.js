import './style_forbidden.css';
import { NavLink } from "react-router-dom";


const Forbidden = () => {
    return(
        <body>
    <div className="forbidden-container">
        <div className="forbidden-icon">🚫</div>
        <h1 className="forbidden-title">Доступ запрещен</h1>
        <p className="forbidden-message">
            У вас недостаточно прав для просмотра этой страницы. 
            Пожалуйста, обратитесь к администратору для получения необходимых разрешений.
        </p>
        <NavLink to="/lead_page" className="return-link">Вернуться на главную</NavLink>
    </div>
</body>
    );
};
export default Forbidden;