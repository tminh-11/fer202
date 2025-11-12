import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.get('http://localhost:3001/users');
      const user = res.data.find(u => u.username === username && u.password === password);

      if (user) {
        setUser(username);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/motorbikes');
        }, 2000);
      } else {
        setError('Invalid username or password!');
      }
    } catch (err) {
        setError('Login failed. Try again.');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Form onSubmit={handleLogin} className="p-4 border rounded shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">Login</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>

      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Welcome, <strong>{username}</strong> login successful!
        </Modal.Body>
      </Modal>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LoginForm;