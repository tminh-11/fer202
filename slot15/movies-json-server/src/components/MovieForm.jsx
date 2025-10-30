import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview }) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Poster</Form.Label>
          <Form.Control type="file" name="avatarFile" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px' }} />
            </div>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tên phim</Form.Label>
          <Form.Control type="text" name="title" value={currentMovie.title || ''} onChange={handleInputChange} placeholder="Nhập tên phim" required />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>Thời lượng</Form.Label>
          <Form.Control type="number" name="duration" value={currentMovie.duration || ''} onChange={handleInputChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formYear">
          <Form.Label>Năm</Form.Label>
          <Form.Control type="number" name="year" value={currentMovie.year || ''} onChange={handleInputChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formCountry">
          <Form.Label>Quốc gia</Form.Label>
          <Form.Control type="text" name="country" value={currentMovie.country || ''} onChange={handleInputChange} />
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0),
      year: parseInt(currentMovie.year || 0),
    };
    await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
  };

  return (
    <Container className="p-3 border mt-3">
      <h3>🎬 Thêm phim mới</h3>
      <Form onSubmit={handleSubmit}>
        <MovieFields currentMovie={currentMovie} handleInputChange={handleInputChange} handleFileChange={handleFileChange} imagePreview={imagePreview} />
        <Button variant="success" type="submit">
          ➕ Thêm phim
        </Button>
      </Form>

      <Modal show={showEditModal} onHide={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa phim</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields currentMovie={currentMovie} handleInputChange={handleInputChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}>
              Hủy
            </Button>
            <Button variant="warning" type="submit">
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default MovieForm;
