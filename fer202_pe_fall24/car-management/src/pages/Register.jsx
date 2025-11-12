import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export default function Register() {
  const { registerUser } = useContext(AppContext);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.email.trim() || !form.password) {
      return alert('Please fill all fields');
    }
    // Basic client-side registration
    registerUser({ username: form.username.trim(), email: form.email.trim() });
    alert(`Hello, ${form.username.trim()}! Your registration is successful.`);
    // redirect to car management
    navigate('/cars');
  };

  return (
    <Card style={{ maxWidth: 600, margin: '30px auto', padding: 20 }}>
      <h4 className="mb-3">Register</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" value={form.username} onChange={handleChange} placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </Card>
  );
}
