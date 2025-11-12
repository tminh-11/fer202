import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';

const MobileDetailPage = () => {
  const { id } = useParams(); // LẤY ID TỪ URL
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { favourites, toggleFavourite } = useFavourite();

  useEffect(() => {
    const fetchMobile = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/mobiles/${id}`);
        setMobile(res.data);
      } catch (err) {
        console.error("Mobile not found:", err);
        navigate('/404'); // ĐI ĐẾN 404
      } finally {
        setLoading(false);
      }
    };
    fetchMobile();
  }, [id, navigate]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (!mobile) return null; // navigate đã xử lý

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={mobile.image} style={{ height: '300px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title><h2>{mobile.name}</h2></Card.Title>
          <Card.Text>{mobile.description}</Card.Text>
          <Card.Text><strong>Price:</strong> ${mobile.price}</Card.Text>
          <Card.Text><strong>In Stock:</strong> {mobile.stock}</Card.Text>
          <div className="d-flex gap-2 flex-wrap">
            <Button 
              variant="success" 
              onClick={() => addToCart(mobile)}
              disabled={mobile.stock === 0}
            >
              Add to Cart
            </Button>
            <Button
              variant={favourites.includes(mobile.id) ? "danger" : "outline-danger"}
              onClick={() => toggleFavourite(mobile.id)}
            >
              {favourites.includes(mobile.id) ? 'Remove Favourite' : 'Favourite'}
            </Button>
            <Button variant="secondary" onClick={() => navigate('/mobiles')}>
              Back to List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MobileDetailPage;