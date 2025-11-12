import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export default function Header() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/register">Car Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/cars">Car Management</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {state.user ? (
              <>
                <div className="me-3">Hi, <strong>{state.user.username}</strong></div>
                <Button variant="outline-secondary" onClick={() => { localStorage.removeItem('car_user'); window.location.href = '/register'; }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/register')}>Register</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
