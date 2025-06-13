import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";



const ProtectedRoute = ({ children, permission }) => {
  const { user, isLoading } = useUser();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  if (isLoading) return <div>Загрузка...</div>;

  if (!user) return <Navigate to="/" />;

  if (permission && (!user.permissions || !user.permissions.includes(permission))) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default ProtectedRoute;
