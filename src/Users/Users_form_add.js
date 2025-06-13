import '../style_auth.css';
import React from "react";
import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Users_form_add = ({ onClose }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [registerName, setRegisterName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
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
    const fetchCreateUser = async (e) => {
            e.preventDefault();
            const formattedPhoneNumber = registerPhoneNumber.startsWith("+")
            ? registerPhoneNumber
            : `+${registerPhoneNumber}`;
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API_URL}/auth/register/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: registerEmail, password: registerPassword, phone_number: registerPhoneNumber, first_name: registerName, last_name: registerLastName })
            });
            const userIdResponse = await fetch(`${API_URL}/auth/get_user_id_by_phone/?phone_number=${encodeURIComponent(formattedPhoneNumber)}`);
            if (!userIdResponse.ok) {
                console.error("Ошибка при получении user_id");
                return;
            }
            const { user_id } = await userIdResponse.json();
            const roleIdResponse = await fetch(`${API_URL}/roles/get_by_id_role/?name=${selectedRole}`, {
                headers: {
                Authorization: `Bearer ${token}`}
              });
            if (!roleIdResponse.ok) {
                console.error("Ошибка при получении role_id");
                return;
            }
            const { role_id } = await roleIdResponse.json();
            const roleResponse = await fetch(`${API_URL}/users_roles/create_user_role/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`},
                body: JSON.stringify({
                    user_id: user_id,
                    role_id: role_id,
                }),
            });
            if (!roleResponse.ok) {
                console.error("Ошибка при привязке роли к пользователю");
                return;
            }
            onClose();

        };
    useEffect(() => {
        fetchRoles();
    }, []);
    return(
        <div id="addUserModal" className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={onClose}>&times;</span>
            <h2>Добавить пользователя</h2>
            <form id="addUserForm" onSubmit={fetchCreateUser}>
                <div className="input-group">
                    <label for="newUserFirstName">Имя</label>
                    <input type="text" id="newUserFirstName" required value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label for="newUserLastName">Фамилия</label>
                    <input type="text" id="newUserLastName" required value={registerLastName}
                    onChange={(e) => setRegisterLastName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label for="newUserEmail">Электронная почта</label>
                    <input type="email" id="newUserEmail" required value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label for="newUserPhone">Номер телефона</label>
                    <input type="tel" id="newUserPhone" value={registerPhoneNumber}
                    onChange={(e) => setRegisterPhoneNumber(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label for="newPassword">Пароль</label>
                    <input type="password" id="newPassword" value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}/>
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
                <button type="submit" className="submit-btn">Создать пользователя</button>
            </form>
        </div>
    </div>
    );
};
export default Users_form_add;