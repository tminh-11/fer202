import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${id}`).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Đang tải chi tiết phim...</p>
      </div>
    );

  return (
    <Container className="mt-5">
      <Card className="p-3 shadow">
        <Card.Img
          src={movie.avatar || movie.poster}
          alt={movie.title}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
        <Card.Body>
          <h3>{movie.title}</h3>
          <p>
            <strong>Năm:</strong> {movie.year} <br />
            <strong>Quốc gia:</strong> {movie.country} <br />
            <strong>Thời lượng:</strong> {movie.duration} phút <br />
          </p>
          <p>{movie.description}</p>
          <Button variant="secondary" onClick={() => navigate('/movies')}>
            ← Back to list
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieDetails;
