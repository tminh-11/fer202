import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="text-center my-5">
      <h1 className="mb-4">Welcome to Video App</h1>
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Img variant="top" src="/images/image1.jpeg" />
        <Card.Body>
          <Card.Title>Explore Amazing Videos</Card.Title>
          <Card.Text>
            Watch tutorials, courses, and entertainment videos.
          </Card.Text>
          <Link to="/videos">
            <Button variant="primary">Browse Videos</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;