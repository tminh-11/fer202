// src/pages/HomePage.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar/Navbar";
import HomeCarousel from "../components/Home/HomeCarousel";
import Filter from "../components/Movie/Filter";
import MoviePage from "./MoviePage";
import MyFooter from "../components/Footer/MyFooter";

export default function HomePage() {
  const [filters, setFilters] = useState({});

  const handleApply = (f) => {
    setFilters(f);
    console.log("Applied filters:", f);
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <NavBar />
      <HomeCarousel />
      <div className="container py-4">
        <Filter onApply={handleApply} />
        <MoviePage filters={filters} />
      </div>
      <MyFooter
        author="MinhNHT"
        email="nickpospast@gmail.com"
        linkGithub="Movie Management Project"
      />
    </div>
  );
}
