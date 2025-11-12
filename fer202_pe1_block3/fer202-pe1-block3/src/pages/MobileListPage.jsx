import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import MobileCard from '../components/MobileCard';
import axios from 'axios';

const MobileListPage = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/mobiles')
      .then(res => {
        setMobiles(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Alert variant="info">Loading mobiles...</Alert>;

  return (
    <Container className="my-4">
      <h2>Mobile List</h2>
      <Row>
        {mobiles.map(mobile => (
          <Col md={4} key={mobile.id} className="mb-4">
            <MobileCard mobile={mobile} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MobileListPage;