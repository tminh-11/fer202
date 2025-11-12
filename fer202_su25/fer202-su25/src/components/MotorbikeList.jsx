import React, { useState } from 'react';
import { useBikes } from '../context/BikeContext';
import { useCart } from '../context/CartContext';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MotorbikeList = () => {
  const { bikes, loading } = useBikes();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [message, setMessage] = useState('');

  const filteredAndSorted = bikes
    .filter(bike => bike.model.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const handleAddToCart = (bike) => {
    if (bike.stock > 0) {
      addToCart(bike);
      setMessage(`Added ${bike.model} to cart!`);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  if (loading) return <p>Loading motorbikes...</p>;

  return (
    <>
      <h2>Motorbike List</h2>
      {message && <Alert variant="success">{message}</Alert>}

      <Row className="mb-3 align-items-center">
        <Col md={5}>
          <Form.Control
            placeholder="Search by Model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Link to="/cart">
            <Button variant="success" className="w-100">View Cart</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        {filteredAndSorted.map(bike => (
          <Col md={4} className="mb-4" key={bike.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={bike.image} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{bike.brand} {bike.model}</Card.Title>
                <Card.Text>
                  Year: {bike.year}<br />
                  Price: <strong>${bike.price}</strong><br />
                  Stock: {bike.stock > 0 ? bike.stock : 'Out of stock'}
                </Card.Text>
                <div className="mt-auto">
                  <Link to={`/view/${bike.id}`} className="me-2">
                    <Button variant="info" size="sm">View Details</Button>
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(bike)}
                    disabled={bike.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MotorbikeList;