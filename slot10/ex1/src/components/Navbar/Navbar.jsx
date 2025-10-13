import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaHeart } from "react-icons/fa";
import "./Navbar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="site-nav">
      <div className="nav-left">
        <Link to="/" className="brand">🎬 ShadowReel</Link>
      </div>

      <div className="nav-center">
        <input
          placeholder="Quick search..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
            }
          }}
        />
        <FaSearch className="icon-search" />
      </div>

      <div className="nav-right">
        <Link to="/favourites" className="nav-icon"><FaHeart /></Link>

        <div className="dropdown" ref={dropdownRef}>
          <FaUserCircle
            className={`nav-icon ${dropdownOpen ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          />
          <div
            className={`dropdown-content ${dropdownOpen ? "show" : ""}`}
            onClick={(e) => e.stopPropagation()} // giữ mở khi click vào menu
          >
            <Link to="/account">Manage Your Profiles</Link>
            <Link to="/account">Build your Account</Link>
            <Link to="/account">Change Password</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
