import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import "./HomeCarousel.css";

function HomeCarousel() {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Inception_OST.jpg"
          alt="Movie 1"
        />
        <Carousel.Caption>
          <h3>Inception</h3>
          <Badge bg="info">Science Fiction</Badge>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/the-dark-knight.jpg"
          alt="Movie 2"
        />
        <Carousel.Caption>
          <h3>The Dark Knight</h3>
          <Badge bg="secondary">Action</Badge>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Interstellar_poster.jpg"
          alt="Movie 3"
        />
        <Carousel.Caption>
          <h3>Interstellar</h3>
          <Badge bg="warning">Adventure</Badge>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
