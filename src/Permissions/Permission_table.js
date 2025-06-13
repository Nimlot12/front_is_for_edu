import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Permission_table = () => {
    const [permissions, setPermission] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;
    useEffect(() => {
            const fetchPermission = async () => {
              try {
                const token = localStorage.getItem("access_token");
                const response = await fetch(`${API_URL}/permission/get_by_permissions_list/?page=${currentPage}&limit=${pageSize}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                if (response.ok) {
                  const data = await response.json();
                  setPermission(data);
                } else {
                  console.error("Ошибка получения доступа", response.status);
                }
              } catch (error) {
                console.error("Ошибка получения доступа:", error);
              }
            };
        
            fetchPermission();
          }, [currentPage]);
    return(
        <div className="users-list">
            <div className="users-list-header">
                    <button id="addUserBtn" className="add-user-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Добавить доступ
                    </button>
                </div>
                <table id="usersTable">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Доступ</th>
                            <th>Описание доступа</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                    {permissions.map((permission) => (
                            <tr key={permission.id}>
                            <td>{permission.id}</td>
                            <td>{permission.permission}</td>
                            <td></td>
                            <td>
                                <button className="edit-btn">Изменить</button>
                                <button className="delete-btn">Удалить</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button id="prevPage" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Предыдущая</button>
                    <span id="currentPage">{currentPage}</span>
                    <button id="nextPage" onClick={() => {
                        if (permissions.length === pageSize) {
                        setCurrentPage(prev => prev + 1);
                        }
                    }}
                    disabled={permissions.length < pageSize}>Следующая</button>
                </div>
            </div>
    );
};
export default Permission_table;