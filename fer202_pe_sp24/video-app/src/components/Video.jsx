import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

const Video = ({ video }) => {
  return (
    <Card className="h-100 shadow-sm">
      <div className="ratio ratio-16x9">
        <iframe
          src={video.url}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <Card.Text>{video.description}</Card.Text>
        <Card.Text><small className="text-muted">Duration: {video.duration}</small></Card.Text>
      </Card.Body>
      {video.comments.length > 0 && (
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Comments:</strong></ListGroup.Item>
          {video.comments.map(comment => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.user}:</strong> {comment.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
};

Video.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

export default Video;