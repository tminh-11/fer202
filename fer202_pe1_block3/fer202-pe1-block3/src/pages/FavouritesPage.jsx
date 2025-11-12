import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useFavourite } from '../context/FavouriteContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MobileCard from '../components/MobileCard';

const FavouritesPage = () => {
  const { favourites } = useFavourite();
  const [favMobiles, setFavMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favourites.length === 0) {
      setLoading(false);
      return;
    }

    const fetchFav = async () => {
      try {
        const promises = favourites.map(id => axios.get(`http://localhost:3001/mobiles/${id}`));
        const results = await Promise.all(promises);
        setFavMobiles(results.map(r => r.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFav();
  }, [favourites]);

  if (loading) return <p className="text-center mt-5">Loading favourites...</p>;

  if (favourites.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <h4>No Favourites Yet</h4>
          <p>Click the heart icon on any mobile to add it here!</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>My Favourites ({favourites.length})</h2>
      <Row>
        {favMobiles.map(mobile => (
          <Col md={4} key={mobile.id} className="mb-4">
            <MobileCard mobile={mobile} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavouritesPage;