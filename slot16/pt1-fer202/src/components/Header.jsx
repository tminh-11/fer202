import React, { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
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
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>TuitionTracker</Navbar.Brand>
        <div className="d-flex align-items-center">
          {state.user && <span className="me-3 text-white">Signed in as {state.user.fullName}</span>}
          <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </Container>
    </Navbar>
  );
}
