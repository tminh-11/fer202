// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <HomeCarousel />

      <section className="featured-section text-center">
        <h4 className="fw-bold text-warning mt-5">🎬 Featured Movie Collections</h4>
        <p className="text-light mx-auto" style={{ maxWidth: "700px" }}>
          Explore the best cinematic masterpieces that define storytelling — sci-fi journeys, heroic
          battles, and breathtaking adventures.
        </p>
      </section>
    </div>
  );
}
