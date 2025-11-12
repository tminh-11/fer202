import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselComponent from '../components/Carousel';

const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Mobile Shop</h1>
      <p className="lead">Best deals on latest smartphones!</p>
      <CarouselComponent />
      <Link to="/mobiles">
        <Button variant="primary" size="lg" className="mt-4">
          Browse Mobile Shop
        </Button>
      </Link>
    </Container>
  );
};

export default HomePage;