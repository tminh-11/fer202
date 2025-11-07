import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setError('');

    const user = await login(username, password);
    if (!user) {
      setError('❌ Sai tài khoản hoặc mật khẩu!');
    } else {
      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
        navigate('/movies');
      }, 1800);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '380px', padding: '20px' }}>
        <h3 className="text-center mb-4">🎬 Đăng nhập hệ thống</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nhập username"
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tên đăng nhập!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập mật khẩu!
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card>

      <Modal show={showWelcome} centered>
        <Modal.Body className="text-center p-4">
          <h4>🎉 Welcome, {username}!</h4>
          <p>Đang chuyển đến trang quản lý phim...</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login;
