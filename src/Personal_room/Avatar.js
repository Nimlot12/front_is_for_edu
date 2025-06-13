import '../style_auth.css';
import react, { useEffect, useState, useRef } from "react"
import {useUser} from "../UserContext";


const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Avatar = () => {
    const { user, setUser } = useUser();
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("access_token");

            const response = await fetch(`${API_URL}/auth/avatar_upload/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar_path: updatedUser.avatar_url, // Обновляем только аватар
                }));
                alert("Аватар успешно загружен!");
            } else {
                alert("Ошибка при загрузке аватара");
            }
        } catch (error) {
            console.error("Ошибка загрузки аватара:", error);
        }
    };


    const handleRemoveAvatar = async () => {
        try {
            const token = localStorage.getItem("access_token");

            const response = await fetch(`${API_URL}/auth/avatar_delete/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setUser((prevUser) => ({ ...prevUser, avatar_path: null }));
                alert("Аватар удален!");
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;  // Сбрасываем поле
                }
            } else {
                alert("Ошибка при удалении аватара");
            }
        } catch (error) {
            console.error("Ошибка удаления аватара:", error);
        }
    };

    return(
        <div className="avatar-section">
            <div className="avatar-container">
                <img id="profileAvatar" src={user?.avatar_path ? `${API_URL}/${user.avatar_path}` : `${API_URL}/static/avatars/default_avatar.png`} alt="Аватар пользователя" className="profile-avatar"/>
                <div className="avatar-actions">
                    <input type="file" id="avatarUpload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} ref={fileInputRef}/>
                    <button onClick={() => fileInputRef.current.click()} id="uploadAvatarBtn" className="avatar-btn" >Загрузить</button>
                    <button onClick={handleRemoveAvatar} id="removeAvatarBtn" className="avatar-btn">Удалить</button>
                </div>
            </div>
        </div>
    );
};
export default Avatar;