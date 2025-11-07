import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserList from "../pages/UserList"; // 🔹 thêm trang quản lý user
import { AppContext } from "../contexts/AppContext";

export default function AppRouter() {
  const { state } = useContext(AppContext);
  const user = state.user;

  const isAdminActive = user && user.role === "admin" && user.status === "active";

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Chỉ admin active mới vào được */}
      <Route
        path="/home"
        element={isAdminActive ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/users"
        element={isAdminActive ? <UserList /> : <Navigate to="/login" replace />}
      />

      {/* Route mặc định */}
      <Route
        path="/"
        element={<Navigate to={isAdminActive ? "/home" : "/login"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
