import React from 'react';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <BSNavbar.Brand>Motorbike Shop</BSNavbar.Brand>
        <BSNavbar.Toggle />
        <BSNavbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/motorbikes">Motorbikes</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          </Nav>
          <Nav>
            <BSNavbar.Text className="me-3">Welcome, {user}</BSNavbar.Text>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;