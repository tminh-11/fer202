import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './contexts/AppContext';
import Register from './pages/Register';
import CarManagement from './pages/CarManagement';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';

function AppShell() {
  const { state, fetchCars } = useContext(AppContext);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <Header />
      <Container className="py-4" style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={state.user ? <CarManagement /> : <Navigate to="/register" />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </Container>
    </>
  );
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
