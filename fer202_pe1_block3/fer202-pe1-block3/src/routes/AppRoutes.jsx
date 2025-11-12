import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import MobileListPage from '../pages/MobileListPage';
import MobileDetailPage from '../pages/MobileDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import FavouritesPage from '../pages/FavouritesPage';
import CartPage from '../pages/CartPage';
import NotFound from '../components/NotFound';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* PROTECTED ROUTES - PHẢI LOGIN MỚI VÀO ĐƯỢC */}
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/mobiles" element={<ProtectedRoute><MobileListPage /></ProtectedRoute>} />
      <Route path="/mobiles/:id" element={<ProtectedRoute><MobileDetailPage /></ProtectedRoute>} />
      <Route path="/favourites" element={<ProtectedRoute><FavouritesPage /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;