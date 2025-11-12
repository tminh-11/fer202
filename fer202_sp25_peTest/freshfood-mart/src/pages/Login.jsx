import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert('Enter username');
    login(username.trim());
    navigate('/');
  };

  return (
    <Card style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
      <h4 className="mb-3">Login</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="(not required for demo)" />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Card>
  );
}
