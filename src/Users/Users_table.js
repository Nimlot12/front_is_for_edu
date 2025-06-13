import React, { useEffect, useState } from "react";
import Users_form_add from "./Users_form_add";
import User_edit from "./User_edit";
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Users_table = () => {
    const [users, setUsers] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleEditUser = (userId) => {
        setSelectedUserId(userId);
        setTimeout(() => setSelectedUserId(userId), 0);
    };

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API_URL}/auth/get_users_list/?page=${currentPage}&limit=${pageSize}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              setUsers(data);
            } else {
              console.error("Ошибка получения пользователей", response.status);
            }
          } catch (error) {
            console.error("Ошибка получения пользователей:", error);
          }
        };
        const fetchUserRoles = async () => {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API_URL}/users_roles/get_by_users_roles_list/`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
              const data = await response.json();
              setUserRoles(data);
            }
          };
    
        fetchUsers();
        fetchUserRoles();
      }, [currentPage]);

      // Создаем словарь ролей по user_id:
    const rolesMap = userRoles.reduce((acc, role) => {
        acc[role.user_id] = role.role;
        return acc;
    }, {});

    const handleDeleteUser = async (userId, role) => {
        if (!window.confirm("Вы уверены, что хотите удалить этого пользователя?")) return;

        try {
            const token = localStorage.getItem("access_token");
            if (role!=null){
                const roleIdResponse = await fetch(`${API_URL}/roles/get_by_id_role/?name=${role}`, {
                    headers: {
                    Authorization: `Bearer ${token}`}
                  });
                  const { role_id } = await roleIdResponse.json();
                  const response1 = await fetch(`${API_URL}/users_roles/delete_user_role/?user_id=${userId}&role_id=${role_id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            const response = await fetch(`${API_URL}/auth/delete_user/?id=${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении пользователя");
            }

            console.log("Пользователь удален");
            setUsers(users.filter(user => user.id !== userId)); // Обновляем список пользователей
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return(
        <div className="users-list">
            <div className="users-list-header">
                    <button id="addUserBtn" className="add-user-btn" onClick={() => setShowModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Добавить пользователя
                    </button>
                    {showModal && <Users_form_add onClose={() => setShowModal(false)} />}
                </div>
                <table id="usersTable">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Аватар</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Почта</th>
                            <th>Телефон</th>
                            <th>Роль</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                        {users.map((user) => (
                            <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <img
                                src={
                                    user.avatar_path
                                    ? `${API_URL}/${user.avatar_path}`
                                    : `${API_URL}/static/avatars/default_avatar.png`
                                }
                                alt="Аватар"
                                width="50"
                                className="user-avatar"/>
                            </td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_number}</td>
                            <td>{rolesMap[user.id] || "Не задана"}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditUser(user.id)}>Изменить</button>
                                <button className="delete-btn" onClick={() => handleDeleteUser(user.id, rolesMap[user.id])}>Удалить</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button id="prevPage" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Предыдущая</button>
                    <span id="currentPage">{currentPage}</span>
                    <button id="nextPage" onClick={() => {
                        if (users.length === pageSize) {
                        setCurrentPage(prev => prev + 1);
                        }
                    }}
                    disabled={users.length < pageSize}>Следующая</button>
                    {selectedUserId && <User_edit onClose={() => setSelectedUserId(null)} user_id={selectedUserId} />}
                </div>
            </div>
    );
};
export default Users_table;