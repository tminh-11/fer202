// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import "../components/Home/HomeCarousel.css";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Carousel */}
      <section className="home-carousel">
        <HomeCarousel />
      </section>

      {/* About Section */}
      <section className="container text-center my-5">
        <h2 className="fw-bold display-5 text-light mb-3">
          Welcome to <span className="text-warning">Movie Management</span>
        </h2>
        <p className="text-secondary lead" style={{ maxWidth: 700, margin: "0 auto" }}>
          Discover and manage your favorite movies. Track collections, explore genres,
          and keep everything organized — all in one cinematic platform.
        </p>
      </section>
    </div>
  );
}
