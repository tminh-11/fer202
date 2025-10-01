import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="d-flex justify-content-center bg-warning">
      <a href="#home" className="mx-2 text-dark text-decoration-none">Home</a>
      <a href="#about" className="mx-2 text-dark text-decoration-none">About</a>
      <a href="#contact" className="mx-2 text-dark text-decoration-none">Contact</a>
    </nav>
  );
}

export default Navbar;
