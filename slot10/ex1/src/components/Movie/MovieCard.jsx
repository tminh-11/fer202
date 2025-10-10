// src/components/Movie/MovieCard.jsx
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddFavourite = () => {
    const fav = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (!fav.find((f) => f.id === movie.id)) {
      fav.push(movie);
      localStorage.setItem("favourites", JSON.stringify(fav));
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <>
      <Card className="movie-card h-100 text-light bg-dark">
        <div className="poster-wrap">
          <Card.Img
            variant="top"
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
          />
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-warning">{movie.title}</Card.Title>

          <div className="mb-2">
            <Badge bg="danger">{movie.genre}</Badge>
          </div>

          <Card.Text className="movie-text">
            {movie.description.length > 90
              ? movie.description.slice(0, 90) + "..."
              : movie.description}
          </Card.Text>

          <div className="movie-meta mt-auto mb-3 small text-muted">
            <span><strong>Year:</strong> {movie.year}</span>{" • "}
            <span><strong>Country:</strong> {movie.country}</span>{" • "}
            <span><strong>Dur:</strong> {movie.duration}m</span>
          </div>

          <div className="d-flex gap-2">
            <Button variant="outline-warning" onClick={() => setShowModal(true)}>
              View Details
            </Button>
            <Button variant="warning" onClick={handleAddFavourite}>
              Add to Favourites
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed bottom-0 end-0 m-3"
        bg="success"
        autohide
        delay={1500}
      >
        <Toast.Body className="text-white">Added to favourites!</Toast.Body>
      </Toast>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div className="movie-details-body">
    <img src={movie.poster} alt={movie.title} />
    <div className="movie-details-text">
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Country:</strong> {movie.country}</p>
      <p><strong>Duration:</strong> {movie.duration} mins</p>
      <hr />
      <p>{movie.description}</p>
      <hr />
      <p><strong>Showtimes:</strong></p>
      <ul>
        <li>Today 14:30</li>
        <li>Today 18:00</li>
        <li>Tomorrow 20:30</li>
      </ul>
    </div>
  </div>
</Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
