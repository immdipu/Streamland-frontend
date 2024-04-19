"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MiniCarousel from "./template/MiniCarousel";
import Template from "./template/Template";

interface dataProps {
  data: getTrendingListResponse[];
}

const CarouselContainer: React.FC<dataProps> = ({ data }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className=" w-screen max-lg:w-full h-[85vh]  max-lg:h-full relative">
      <div className="h-full max-lg:h-[60vh] max-sm:h-[45vh]">
        <Template item={data[index] || []} />
      </div>
      <section className=" w-1/2  max-lg:static absolute bottom-0 translate-y-[60px] max-lg:mt-8 max-lg:translate-y-0 max-lg:w-full  right-0  z-20 ">
        <div
          onClick={() => {
            setIndex(index - 1);
          }}
          className="absolute left-0 w-48  my-4  z-40 bottom-0 top-0 bg-gradient-to-r from-neutral-950"
        />
        <div
          onClick={() => {
            setIndex(index + 1);
          }}
          className="absolute right-0 w-48  my-4  z-40 bottom-0 top-0 bg-gradient-to-l from-neutral-800"
        />
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          emulateTouch
          infiniteLoop
          centerMode
          selectedItem={index}
          centerSlidePercentage={40}
          dynamicHeight={false}
          onChange={(index, item) => {
            setIndex(index);
          }}
          className="!h-full w-full overflow-visible"
        >
          {data.map((item: getTrendingListResponse, I) => (
            <MiniCarousel selected={I === index} key={item.id} item={item} />
          ))}
        </Carousel>
        <div />
      </section>
    </div>
  );
};

export default CarouselContainer;
