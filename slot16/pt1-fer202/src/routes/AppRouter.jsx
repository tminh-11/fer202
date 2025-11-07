import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { AppContext } from "../contexts/AppContext";

export default function AppRouter() {
  const { state } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={state.user ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route path="/" element={<Navigate to={state.user ? "/home" : "/login"} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
