import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const MotorbikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/motorbikes/${id}`);
        setBike(res.data);
      } catch (err) {
        setBike(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBike();
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (!bike) return navigate('/*');

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={bike.image} />
        <Card.Body>
          <Card.Title>{bike.brand} {bike.model}</Card.Title>
          <Card.Text>
            <strong>Year:</strong> {bike.year}<br />
            <strong>Price:</strong> ${bike.price}<br />
            <strong>Stock:</strong> {bike.stock}
          </Card.Text>
          <Button variant="secondary" onClick={() => navigate('/motorbikes')}>
            Back to List
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MotorbikeDetail;