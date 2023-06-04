"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselContainer = () => {
  return (
    <Carousel showThumbs={false} autoPlay>
      <div>
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <p className="legend">Legend 1</p>
      </div>
    </Carousel>
  );
};

export default CarouselContainer;
