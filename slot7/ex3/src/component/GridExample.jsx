import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function GridExample() {
  return (
    <div>
      {/* Header Section */}
      <div className="p-5 mb-4 bg-light">
        <h2 className="fw-bold">Let's test the grid!</h2>
      </div>

      {/* Navigation Links */}
      <ul className="nav mb-3">
        <li className="nav-item">
          <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>

      {/* Grid Layout */}
      <div className="container mt-4">
        {/* First row - thêm 1 col */}
        <div className="row mb-2">
          <div className="col bg-secondary text-white p-3 border-end">First col</div>
          <div className="col bg-secondary text-white p-3">Second col</div>
        </div>

        {/* Second row (1 + 2 + 1 + 2 = 6 parts) */}
        <div className="row mb-2">
          <div className="col bg-secondary text-white p-3 border-end">col</div>
          <div className="col bg-secondary text-white p-3 border-end">col</div>
          <div className="col-2 bg-secondary text-white p-3">col</div>
        </div>

        {/* Third row (5 equal columns) */}
        <div className="row mb-2">
          <div className="col bg-secondary text-white p-3 border-end">col</div>
          <div className="col bg-secondary text-white p-3 border-end">col</div>
          <div className="col bg-secondary text-white p-3 border-end">col</div>
          <div className="col bg-secondary text-white p-3">col</div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center p-3 mt-4"
        style={{ backgroundColor: "#d9c9c9" }}
      >
        <h4 className="fw-bold">Created by ABC!</h4>
      </footer>
    </div>
  );
}

export default GridExample;
