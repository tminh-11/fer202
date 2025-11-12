import { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../features/videoSlice';
import Video from '../components/Video';

const VideosPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.videos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  return (
    <Container className="my-4">
      <h2 className="mb-4">All Videos</h2>
      {status === 'loading' && <Spinner animation="border" className="d-block mx-auto" />}
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}
      {status === 'succeeded' && (
        <Row>
          {items.map(video => (
            <Col md={6} lg={4} className="mb-4" key={video.id}>
              <Video video={video} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default VideosPage;