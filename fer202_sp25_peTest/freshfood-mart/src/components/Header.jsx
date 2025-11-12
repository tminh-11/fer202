import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export default function Header() {
  const { state, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const totalItems = state.cart.reduce((s, c) => s + c.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {state.store.name || 'FreshFood Mart'}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/store">
              Store
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {state.user ? (
              <>
                <span className="me-3">Hi, {state.user.username}</span>
                <Button variant="outline-primary" className="me-2" onClick={() => navigate('/store')}>
                  Cart <Badge bg="secondary">{totalItems}</Badge>
                </Button>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/login')}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
