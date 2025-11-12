import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { AppContext } from '../contexts/AppContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  const { state } = useContext(AppContext);
  const prods = state.products;

  return (
    <div>
      <h2>Welcome to {state.store.name || 'FreshFood Mart'}</h2>
      <p>{state.store.location}</p>

      {prods.length ? (
        <Carousel className="mb-4">
          {prods.map((p) => (
            <Carousel.Item key={p.id}>
              <img className="d-block w-100" src={p.img} alt={p.name} style={{ height: '400px', objectFit: 'cover' }} />
              <Carousel.Caption>
                <h3>{p.name}</h3>
                <p>{p.category} — {p.price.toLocaleString()} VND</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Loading featured products...</p>
      )}

      <h4>Quick Info</h4>
      <Row>
        <Col md={6}>
          <div>Total products: {prods.length}</div>
        </Col>
        <Col md={6}>
          <div>Logged in as demo user (for this assignment)</div>
        </Col>
      </Row>
    </div>
  );
}
