import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "#f3f3f3",
      }}
    >
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Trang Chủ
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Giới Thiệu
      </NavLink>

      <NavLink
        to="/users/123"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        User 123
      </NavLink>

      <NavLink
        to="/san-pham"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Sản Phẩm
      </NavLink>

      <NavLink
        to="/lien-he"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Liên Hệ
      </NavLink>
    </nav>
  );
}
