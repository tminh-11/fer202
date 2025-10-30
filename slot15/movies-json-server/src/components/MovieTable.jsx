import React from 'react';
import { Table, Button, Modal, Spinner, Alert, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, loading, movieToDelete, showDeleteModal } = state;

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
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Poster</th>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Năm</th>
            <th>Thời lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Image src={movie.avatar || movie.poster} style={{ width: '50px' }} rounded />
              </td>
              <td>#{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.duration} phút</td>
              <td>
                <Button size="sm" variant="primary" className="me-2" onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie })}>
                  Sửa
                </Button>
                <Button size="sm" variant="danger" onClick={() => dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie })}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa "{movieToDelete?.title}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
