// src/pages/MoviePage.jsx
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function MoviePage() {
  return (
    <div className="container py-4">
      <h2 className="text-warning mb-3">My movies</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies.map((m) => (
          <Col key={m.id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
