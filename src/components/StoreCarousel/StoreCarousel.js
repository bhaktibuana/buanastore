import React from "react";
import "./StoreCarousel.css";
import Carousel from "react-bootstrap/Carousel";

const StoreCarousel = () => {
  return (
    <>
      <Carousel variant="dark">
        <Carousel.Item interval={5000}>
          <img
            className="carousel-image"
            src={require("../../img/img-carousel-2.jpg")}
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className="carousel-image"
            src={require("../../img/img-carousel-1.jpg")}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default StoreCarousel;
