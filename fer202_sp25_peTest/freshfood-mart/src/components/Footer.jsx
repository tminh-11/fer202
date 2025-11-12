import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { AppContext } from '../contexts/AppContext';
import Container from 'react-bootstrap/Container';

export default function Footer() {
  const { state } = useContext(AppContext);
  const prods = state.products.slice(0, 3);

  return (
    <footer className="bg-light py-3 mt-4 border-top">
      <Container>
        <h6>Featured</h6>
        {prods.length ? (
          <Carousel>
            {prods.map((p) => (
              <Carousel.Item key={p.id}>
                <img
                  className="d-block w-100"
                  src={p.img}
                  alt={p.name}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h6>{p.name}</h6>
                  <p>{p.category} - {p.stock} in stock</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div>No featured products</div>
        )}
        <div className="text-end mt-2">© {new Date().getFullYear()} {state.store.name || 'FreshFood Mart'}</div>
      </Container>
    </footer>
  );
}
