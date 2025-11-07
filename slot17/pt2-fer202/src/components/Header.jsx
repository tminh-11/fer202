import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("pt-fer202");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          TuitionTracker
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/home")}>Payments</Nav.Link>
          <Nav.Link onClick={() => navigate("/users")}>User Management</Nav.Link>
        </Nav>
        <div className="d-flex align-items-center">
          {state.user && (
            <span className="me-3 text-white">
              Signed in as {state.user.fullName}
            </span>
          )}
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
