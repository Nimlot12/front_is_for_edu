import '../style_auth.css';
import React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const User_edit = ({ onClose, user_id }) => {
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        });
    useEffect(() => {
    setUser(null); // Сброс данных перед загрузкой новых
    setLoading(true);
    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API_URL}/roles/get_by_roles_list/`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            if (response.ok) {
                const data = await response.json();
                setRoles(data); // Сохраняем роли в состоянии
                setLoading(false); // Завершаем загрузку
            } else {
                console.error("Ошибка при получении ролей");
            }
        } catch (error) {
            console.error("Ошибка при получении ролей:", error);
            setLoading(false);
        }
    };
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API_URL}/auth/get_user_by_id?id=${user_id}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } else {
                console.error("Ошибка при получении пользователя");
            }
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            setLoading(false);
        }
    };
    fetchUser();
    fetchRoles();
}, [user_id]);
    useEffect(() => {
        
        if (user) {
            setFormData({
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                email: user.email || "",
                phone: user.phone_number || "",
            });
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");

        try {
            // Сначала обновляем данные пользователя
            const userResponse = await fetch(`${API_URL}/auth/update_user_by_id?id=${user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: formData.email,
                    phone_number: formData.phone,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                }),
            });

            if (!userResponse.ok) {
                console.error("Ошибка при обновлении данных пользователя");
                return;
            }

            // Если пароль введен, обновляем его
            if (password.trim()) {
                const passwordResponse = await fetch(`${API_URL}/auth/update_password?id=${user_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ password }),
                });

                if (!passwordResponse.ok) {
                    console.error("Ошибка при обновлении пароля");
                    return;
                }
            }
            onClose(); 

        } catch (error) {
            console.error("Ошибка при обновлении данных:", error);
        }
    };
    return(
        <div id="addUserModal" className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={onClose}>&times;</span>
            <h2>Изменить пользователя</h2>
            <form id="addUserForm" onSubmit={handleUpdate}>
                <div className="input-group">
                    <label for="newUserFirstName">Имя</label>
                    <input type="text" id="newUserFirstName" required value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label for="newUserLastName">Фамилия</label>
                    <input type="text" id="newUserLastName" required value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label for="newUserEmail">Электронная почта</label>
                    <input type="email" id="newUserEmail" required value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label for="newUserPhone">Номер телефона</label>
                    <input type="tel" id="newUserPhone" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label for="newPassword">Пароль</label>
                    <input type={showPassword ? "text" : "password"} id="newPassword"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)} 
                style={{
                    position: "absolute",
                    right: "30px",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                }}
            >
            {showPassword ? <EyeOff size={30} color="#3498db" /> : <Eye size={30} color="#3498db"/>}
            </button>
                </div>
                <div className="input-group">
                    <label for="newUserRole">Роль</label>
                    <select id="newUserRole" required value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Выберите роль</option>
                        {loading ? (
                                <option>Загрузка...</option> // Пока идет загрузка
                            ) : (
                                roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))
                            )}
                    </select>
                </div>
                <button type="submit" className="submit-btn">Сохранить пользователя</button>
            </form>
        </div>
    </div>
    );
};
export default User_edit;