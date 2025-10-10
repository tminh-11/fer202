// src/components/Navbar/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaHeart } from "react-icons/fa";
import "./Navbar.css";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="site-nav">
      <div className="nav-left">
        <Link to="/" className="brand">🎬 CineWorld</Link>
      </div>

      <div className="nav-center">
        <input placeholder="Quick search..." onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
          }
        }} />
        <FaSearch className="icon-search" />
      </div>

      <div className="nav-right">
        <Link to="/favourites" className="nav-icon"><FaHeart /></Link>
        <div className="dropdown">
          <FaUserCircle className="nav-icon" />
          <div className="dropdown-content">
            <Link to="/account">Manage Your Profiles</Link>
            <Link to="/account">Build your Account</Link>
            <Link to="/account">Change Password</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
