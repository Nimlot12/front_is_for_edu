import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    return { ...parsedUser, permissions: parsedUser.permissions || [] };
  }
  return null;
});
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  const refreshUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/me/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.user_id) {
        const userResponse = await fetch(`${API_URL}/auth/get_user_by_id/?id=${data.user_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();

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
          userData.permissions = Array.isArray(permissionsData)
            ? permissionsData.map((perm) => perm.permission)
            : [];
        console.log("Полученные permissions:", permissionsData); // Обеспечиваем, что всегда будет массив
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Обновляем localStorage, когда user меняется
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
