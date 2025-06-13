
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';


function Table({ roleName }) {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false); // Состояние для показа формы
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    phone_number: '',
    first_name: '',
    last_name: '',
  });
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/users_roles/get_by_users_by_role/?role_name=${roleName}`).then(r => r.json()).then(data => setUsers(data))
  }, [roleName])

  const deleteUser = async (userId, roleName) => {
    try {
      // Получение ID роли
      const roleResponse = await fetch(`http://127.0.0.1:8000/roles/get_by_id_role/?name=${roleName}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!roleResponse.ok) {
        throw new Error('Ошибка при получении ID роли');
      }
  
      const { role_id } = await roleResponse.json();
      console.log(`ID роли для "${roleName}": ${role_id}`);
  
      // Удаление связи между пользователем и ролью
      const userRoleResponse = await fetch(`http://127.0.0.1:8000/users_roles/delete_user_role/?user_id=${userId}&role_id=${role_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!userRoleResponse.ok) {
        throw new Error('Ошибка при удалении связи пользователя с ролью');
      }
      console.log('Связь пользователя с ролью успешно удалена');
  
      // Удаление пользователя
      const userResponse = await fetch(`http://127.0.0.1:8000/auth/delete_user/?id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!userResponse.ok) {
        throw new Error('Ошибка при удалении пользователя');
      }
      console.log('Пользователь успешно удалён');
  
      // Удаление пользователя из состояния
      setUsers((prev) => prev.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  
  const handleAddUser = async () => {
    try {
      // Регистрация пользователя
      const registerResponse = await fetch('http://127.0.0.1:8000/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!registerResponse.ok) {
        throw new Error('Ошибка при регистрации пользователя');
      }

      console.log('Пользователь успешно зарегистрирован');

      // Получение ID пользователя по номеру телефона
      const phoneResponse = await fetch(
        `http://127.0.0.1:8000/auth/get_user_id_by_phone/?phone_number=${encodeURIComponent(newUser.phone_number)}`, // Кодировка номера
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!phoneResponse.ok) {
        throw new Error('Ошибка при получении ID пользователя');
      }

      const { user_id } = await phoneResponse.json();
      console.log(`Получен ID пользователя: ${user_id}`);

      // Получение ID роли
      const roleResponse = await fetch(`http://127.0.0.1:8000/roles/get_by_id_role/?name=${roleName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!roleResponse.ok) {
        throw new Error('Ошибка при получении ID роли');
      }

      const { role_id } = await roleResponse.json();
      console.log(`Получен ID роли: ${role_id}`);

      // Связывание пользователя с ролью
      const linkResponse = await fetch('http://127.0.0.1:8000/users_roles/create_user_role/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          role_id,
        }),
      });

      if (!linkResponse.ok) {
        throw new Error('Ошибка при связывании пользователя с ролью');
      }

      console.log('Пользователь успешно связан с ролью');

      
      setUsers([...users, { ...newUser, user_id }]);
      setShowForm(false); 
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  

  return (
    <div>
      <table className = "table">
        <thead>
        <tr>
          <th>id</th>
          <th>Почта</th>
          <th>Номер телефона</th>
          <th>Имя</th>
          <th>Фамилия</th>
        </tr>
        </thead>
        <tbody>
          {users.map(m => <tr><td>{m.user_id}</td><td>{m.email}</td><td>{m.phone_number}</td><td>{m.first_name}</td><td>{m.last_name}</td><td><button className = "btn btn-danger" onClick = {() => deleteUser(m.user_id, roleName)}>Удалить</button></td></tr>)}
        </tbody>
      </table>
      {showForm ? (
        <div>
          <h3>Добавить пользователя</h3>
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Пароль</label>
              <input
                type="password"
                className="form-control"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Номер телефона</label>
              <input
                type="text"
                className="form-control"
                value={newUser.phone_number}
                onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Имя</label>
              <input
                type="text"
                className="form-control"
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Фамилия</label>
              <input
                type="text"
                className="form-control"
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddUser}
            >
              Сохранить
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Отмена
            </button>
          </form>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Добавить пользователя
        </button>
      )}
    </div>
  );
}

export default Table;
