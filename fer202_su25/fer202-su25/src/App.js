import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CartProvider } from './context/CartContext';
import { BikeProvider } from './context/BikeContext';
import LoginForm from './components/LoginForm';
import MotorbikeList from './components/MotorbikeList';
import MotorbikeDetail from './components/MotorbikeDetail';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <BikeProvider>
        <CartProvider>
          <div className="App">
            {user && <Navbar user={user} setUser={setUser} />}
            <Container className="mt-4">
              <Routes>
                <Route path="/" element={<LoginForm setUser={setUser} />} />
                <Route
                  path="/motorbikes"
                  element={
                    <ProtectedRoute>
                      <MotorbikeList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/view/:id"
                  element={
                    <ProtectedRoute>
                      <MotorbikeDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </div>
        </CartProvider>
      </BikeProvider>
    </Router>
  );
}

export default App;