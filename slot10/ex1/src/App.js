// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import AccountPage from "./pages/AccountPage";
import FooterPage from "./pages/FooterPage"; // nếu có file này

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/account" element={<AccountPage />} />
        {FooterPage && <Route path="/footer" element={<FooterPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
