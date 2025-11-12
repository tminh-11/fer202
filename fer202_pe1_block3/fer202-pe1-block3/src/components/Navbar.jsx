import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import { Heart, Cart3, BoxArrowInRight, PersonPlus } from 'react-bootstrap-icons';

const NavBar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { favourites } = useFavourite();
  const navigate = useNavigate(); // BÂY GIỜ HOẠT ĐỘNG!

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/'); // DÙNG ĐƯỢC!
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">MobileShop</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/favourites">
              <Heart color="red" size={20} />
              {favourites.length > 0 && <Badge bg="danger" className="ms-1">{favourites.length}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <Cart3 size={20} />
              {cartCount > 0 && <Badge bg="success" className="ms-1">{cartCount}</Badge>}
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link disabled className="text-light">{user}</Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-light">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <BoxArrowInRight size={20} />
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <PersonPlus size={20} />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;