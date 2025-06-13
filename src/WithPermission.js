import { useUser } from "./UserContext";

const WithPermission = ({ permission, children }) => {
  const { user } = useUser();

  if (!user || !user.permissions || !user.permissions.includes(permission)) {
    return null; 
  }

  return children;
};

export default WithPermission;