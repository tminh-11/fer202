import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <h1>404 - Not Found</h1>
        <p>The motorbike you're looking for does not exist.</p>
        <Link to="/motorbikes" className="btn btn-primary">Back to List</Link>
      </Alert>
    </Container>
  );
};

export default NotFound;