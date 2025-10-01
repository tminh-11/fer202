import React from "react";

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-light">
      <img src="/FPT_Education_logo.png" alt="FPT University" style={{ width: "120px" }} />
      <div>
        <span className="me-3 text-danger">HomePage</span>
        <span className="me-3 text-danger">Login</span>
        <span className="me-3 text-danger">Student</span>
        <input type="text" placeholder="Search" className="form-control d-inline-block w-auto" />
      </div>
    </div>
  );
}

export default Header;
