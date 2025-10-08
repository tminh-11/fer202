// src/components/Home/HomeCarousel.jsx
import React from "react";
import { Carousel, Badge } from "react-bootstrap";
import { carouselMovies } from "../../data/carousel";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  return (
    <div className="carousel-wrapper">
      <Carousel fade interval={3500} indicators={false}>
        {carouselMovies.map((m) => (
          <Carousel.Item key={m.id}>
            <div className="carousel-image-container">
              <img className="carousel-image" src={m.poster} alt={m.title} />
              <div className="carousel-overlay"></div>
            </div>

            <Carousel.Caption className="carousel-caption-custom">
              <h2 className="movie-title">
                {m.title}{" "}
                <Badge bg="danger" className="genre-badge">
                  {m.genre}
                </Badge>
              </h2>
              <div className="movie-info">
                <span>{m.year}</span> • <span>{m.country}</span> •{" "}
                <span>{m.duration} mins</span>
              </div>
              <p className="movie-desc">{m.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
