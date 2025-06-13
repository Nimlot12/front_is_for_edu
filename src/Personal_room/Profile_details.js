import '../style_auth.css';
import React, { useState, useEffect, setErrors } from "react";
import { useUser, UserProvider } from "../UserContext";


const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


const Profile_details = () => {
    const { user, setUser, refreshUser } = useUser(); 
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [pnew_password, setPNewPassword] = useState("");
    const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    
    const handleSetPassword = async (e) => {
        const newErrors = {};
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${API_URL}/auth/update_pass_lk`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
                body: JSON.stringify({ password: password, new_password: new_password, new_password2: pnew_password })
            });
            if (!response.ok) {
                throw new Error("Ошибка смены пароля");
            }
            setNotification({ type: "success", message: "Пароль успешно изменён" });
            // Очистка полей
            togglePasswordSection();
            setPassword("");
            setNewPassword("");
            setPNewPassword("");

        } catch (error) {
            setNotification({ type: "error", message: error.message });
        }

        setTimeout(() => setNotification(null), 5000);
            
      };

    const togglePasswordSection = () => {
        setIsPasswordSectionOpen(prevState => !prevState);
        console.log("togglePasswordSection called", isPasswordSectionOpen);
    };

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                email: user.email || "",
                phone: user.phone_number || "",
            });
        }
        const fetchUserData = async () => {
            const token = localStorage.getItem("access_token");
                if (!token) return;
            const Response = await fetch(`${API_URL}/roles/get_role_by_user_id/`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const roleData = await Response.json();
            setRole(roleData);};
        fetchUserData();
    }, [user, isPasswordSectionOpen]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setErrors({});
        const token = localStorage.getItem("access_token");
        try {
          const response = await fetch(`${API_URL}/auth/update_user`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              email: formData.email,
              phone_number: formData.phone,
              first_name: formData.firstName,
              last_name: formData.lastName
            })
          });
    
          if (response.ok) {
            const updatedUser = await response.json();
            const roleget = await fetch(`${API_URL}/roles/get_role_by_user_id/`, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            });
            const rolename = await roleget.json();
            const permissionsResponse = await fetch(`${API_URL}/permission/get_by_permissions_by_role/?role_name=${rolename.role_name}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
              const permissionsData = await permissionsResponse.json();
              updatedUser.permissions = Array.isArray(permissionsData)
                ? permissionsData.map((perm) => perm.permission)
                : [];
            setUser(updatedUser); // Обновляем данные пользователя
            console.log("Обновлённые permissions:", updatedUser.permissions);
            setNotification({ type: "success", message: "Данные успешно обновлены" });
          } else {
            const errorData = await response.json();
            setErrors(errorData);
            setNotification({ type: "error", message: errorData.detail || "Ошибка обновления данных" });
          }
        } catch (error) {
          console.error("Ошибка обновления профиля:", error);
          setNotification({ type: "error", message: error.message });
        }
        setTimeout(() => setNotification(null), 5000);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };


    return(
        <div className="profile-details">
                            {notification && (
                                <div className={`notification ${notification.type}`}>
                                {notification.message}
                                </div>
                            )}
                        <form id="profileForm" onSubmit={handleProfileUpdate}>
                            <div className="input-group">
                                <label htmlFor="firstName">Имя</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastName">Фамилия</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Электронная почта</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="phone">Номер телефона</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="role">Роль</label>
                                <input type="text" id="role" name="role" value={role?.role_name || "Загрузка..."} readOnly/>
                            </div>
                            {notification && (
                                <div className={`notification ${notification.type}`}>
                                    {notification.message}
                                </div>
                            )}
                            <div className="password-section">
                                <h3 id="passwordToggle" className="password-section-header" onClick={togglePasswordSection} style={{ cursor: "pointer" }}>
                                    <span>Смена пароля</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`toggle-icon ${isPasswordSectionOpen ? "open" : ""}`}>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </h3>
                                <div id="passwordChangeContent" className={`password-change-content ${isPasswordSectionOpen ? "active" : ""}`}>
                                    <div className="input-group">
                                        <label htmlFor="currentPassword">Текущий пароль</label>
                                        <input type="password" id="currentPassword" name="currentPassword" value = {password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="newPassword">Новый пароль</label>
                                        <input type="password" id="newPassword" name="newPassword" value = {new_password} onChange={(e) => setNewPassword(e.target.value)}/>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                                        <input type="password" id="confirmPassword" name="confirmPassword" value = {pnew_password} onChange={(e) => setPNewPassword(e.target.value)}/>
                                    </div>
                                    <button type="button" id="changePasswordBtn" className="submit-btn" onClick={handleSetPassword}>Изменить пароль</button>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn">Сохранить изменения</button>
                        </form>
                    </div>
    );
};
export default Profile_details;