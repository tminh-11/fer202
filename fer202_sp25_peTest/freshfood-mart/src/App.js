import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './contexts/AppContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Store from './pages/Store';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';

function ProtectedRoute({ children }) {
  const { state } = useContext(AppContext);
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}

function AppShell() {
  const { state, dispatch, fetchProducts } = useContext(AppContext);

  useEffect(() => {
    // load products on app mount
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Container className="my-4" style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={state.user ? "/" : "/login"} replace />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
