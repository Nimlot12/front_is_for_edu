import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./AuthForm";
import GlPage from "./Gl_page"; 
import Admin_page from "./Admin_page";
import ProtectedRoute from "./ProtectedRoute";
import Personal_room from "./Personal_room/Personal_room";
import { useUser } from "./UserContext";
import { UserProvider } from "./UserContext";
import Users_page from "./Users/Users_page";
import Roles_page from "./Roles/Roles_page";
import Permission_page from "./Permissions/Permission_page";
import Schedule_page from "./Schedule/Schedule_page";
import Forbidden from "./Errors/Forbidden";
import Teach_page from "./Teach_panel/Teach_page";
import Task_bank_page from "./Task_bank/Task_bank_page";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


function App() {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Загрузка...</div>; // Пока не загружены данные, показываем спиннер или сообщение
  }
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/forbidden" element = {<Forbidden/>} ></Route>
          <Route path="/" element={<MainComponent />} />
          <Route
            path="/lead_page"
            element={
              <ProtectedRoute permission="user_permission">
                <GlPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal_room"
            element={
              <ProtectedRoute permission="user_permission">
                <Personal_room />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead_page/Admin_page"
            element={
              <ProtectedRoute permission="admin_permission">
                <Admin_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead_page/Admin_page/users"
            element={
              <ProtectedRoute permission="admin_permission">
                <Users_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead_page/Admin_page/roles"
            element={
              <ProtectedRoute permission="admin_permission">
                <Roles_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead_page/Admin_page/permissions"
            element={
              <ProtectedRoute permission="admin_permission">
                <Permission_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead_page/Admin_page/logs"
            element={
              <ProtectedRoute permission="admin_permission">
                <Admin_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead_page/schedule"
            element={
              <ProtectedRoute permission="admin_permission">
                <Schedule_page />
              </ProtectedRoute>
            }
          />     
          <Route
            path="/lead_page/teach_panel"
            element={
              <ProtectedRoute permission="teacher_permission">
                <Teach_page />
              </ProtectedRoute>
            }
          />  
          <Route
            path="/lead_page/teach_panel/task_bank"
            element={
              <ProtectedRoute permission="teacher_permission">
                <Task_bank_page />
              </ProtectedRoute>
            }
          />                                                  
        </Routes>
      </Router>
    </UserProvider>
  );
}

const MainComponent = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Загрузка...</div>; 
  }
  return <>{!user ? <AuthForm /> : <GlPage />}</>;
};

export default App;