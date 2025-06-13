import logo from './logo.jpg';
import './style_auth.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser } = useUser();
  const { refreshUser } = useUser();


  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  console.log("API_URL:", process.env.REACT_APP_API_URL);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setErrors(newErrors);
    const response = await fetch(`${API_URL}/auth/login/`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            await refreshUser();
            navigate("/lead_page"); // Переход на Gl_page.js
          } else {
            setErrors({ general: "Ошибка входа! Проверьте email и пароль." });
          }
  };
  
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setErrors(newErrors);
    const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: registerEmail, password: registerPassword, phone_number: registerPhoneNumber, first_name: registerName, last_name: registerLastName })
    });
    if (response.ok) {
        const response1 = await fetch(`${API_URL}/auth/login/`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: registerEmail, password: registerPassword })
          }); 
          if (response1.ok) {
            const data = await response1.json();
            localStorage.setItem("access_token", data.access_token);
            navigate("/lead_page");
          } else {
            setErrors({ general: "Ошибка входа! Проверьте email и пароль." });
          }
      } else {
        setErrors({ general: "Ошибка регистрации! Проверьте email и пароль." });
      }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="SchoolDOT Logo" className="logo" />
      </div>
      <div className="form-container">
        <div className="form-switcher">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Вход
          </button>
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Регистрация
          </button>
        </div>
        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <h2>Вход</h2>
            <div className="input-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              {errors.loginEmail && <span className="error">{errors.loginEmail}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="loginPassword">Пароль</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              {errors.loginPassword && <span className="error">{errors.loginPassword}</span>}
            </div>
            {errors.general && <span className="error">{errors.general}</span>}
            <button type="submit" className="submit-btn">Войти</button>
            <div className="form-footer">
              <a href="https://example.com/restore-password">Забыли пароль?</a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegSubmit} className="auth-form">
            <h2>Регистрация</h2>
            <div className="input-group">
              <label htmlFor="registerEmail">email</label>
              <input
                type="email"
                id="registerEmail"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="registerPassword">Пароль</label>
              <input
                type="text"
                id="registerPassword"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="registerPhoneNumber">Номер телефона</label>
              <input
                type="tel"
                id="registerPhoneNumber"
                pattern="^\+[0-9]{10,15}$"
                placeholder="Формат: +79999999999" 
                value={registerPhoneNumber}
                onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="registerName">Имя</label>
              <input
                type="text"
                id="registerName"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="registerLastName">Фамилия</label>
              <input
                type="text"
                id="registerLastName"
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Зарегистрироваться</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
