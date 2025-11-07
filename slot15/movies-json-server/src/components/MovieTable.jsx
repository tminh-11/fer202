import React, { useState, useMemo } from 'react';
import { Table, Button, Spinner, Alert, Image, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, genres, loading } = state;
  const navigate = useNavigate();

  // ===== FILTER & SEARCH =====
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = selectedGenre ? m.genreId === parseInt(selectedGenre) : true;
      return matchTitle && matchGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  if (loading && movies.length === 0)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <Alert variant="info" className="mt-3">
          Đang tải dữ liệu phim...
        </Alert>
      </div>
    );

  return (
    <>
      {/* 🔍 SEARCH + FILTER */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm phim theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Tất cả thể loại</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('');
            }}
          >
            🧹 Reset
          </Button>
        </Col>
      </Row>

      {/* TABLE */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Năm</th>
            <th>Thời lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => {
            const genre = genres.find((g) => Number(g.id) === Number(movie.genreId))?.name || 'Unknown';
            return (
              <tr key={movie.id}>
                <td>
                  <Image
                    src={movie.avatar || movie.poster}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    rounded
                  />
                </td>
                <td>{movie.title}</td>
                <td>{genre}</td>
                <td>{movie.year}</td>
                <td>{movie.duration} phút</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    className="me-2"
                    onClick={() => navigate(`/movies/${movie.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie })}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                       if (window.confirm(`Bạn có chắc muốn xóa phim "${movie.title}" không?`)) {
                      confirmDelete(movie.id);
                       }
                    }}
                  >
                  Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {filteredMovies.length === 0 && (
        <Alert variant="warning" className="text-center">
          Không tìm thấy phim nào phù hợp.
        </Alert>
      )}
    </>
  );
};

export default MovieTable;
