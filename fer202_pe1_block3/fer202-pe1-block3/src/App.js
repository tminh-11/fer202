import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavouriteProvider } from './context/FavouriteContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavouriteProvider>
          <NavBar />
          <Container fluid className="p-0">
            <AppRoutes />
          </Container>
        </FavouriteProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;