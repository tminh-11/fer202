import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img src="/images/carousel/1.jpg" className="d-block w-100" alt="Slide 1" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/carousel/2.jpg" className="d-block w-100" alt="Slide 2" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/carousel/3.jpg" className="d-block w-100" alt="Slide 3" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;