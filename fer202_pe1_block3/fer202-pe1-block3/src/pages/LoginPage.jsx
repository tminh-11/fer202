import React, { useState } from 'react';
import { Form, Button, Alert, Modal, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username) return setError('Username or Email is required.');
    if (!password) return setError('Password is required.');

    const success = await login(username, password);
    if (success) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/mobiles');
      }, 2000);
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <Container className="mt-5">
      <div className="col-md-6 mx-auto">
        <h3>Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username or email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
        </Form>

        <Modal show={showModal} centered>
          <Modal.Header>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Welcome, <strong>{username}</strong>! Login successful.
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

LoginPage.propTypes = {};

export default LoginPage;