import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={true}
      >
        {img.map((imageItemLink, index) => {
          return <img src={imageItemLink} key={index} alt="" />;
        })}
      </Carousel>
      <div className="hero_img"></div>
    </div>
  );
};

export default CarouselEffect;
