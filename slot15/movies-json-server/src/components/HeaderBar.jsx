import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const HeaderBar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>🎞️ Movie Manager</Navbar.Brand>
        <div>
          <span className="text-light me-3">👤 {user?.username}</span>
          <Button variant="outline-light" size="sm" onClick={logout}>
            Đăng xuất
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderBar;
