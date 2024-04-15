"use client";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getTrendingListResponse } from "@/types/types";
import Template from "./template/Template";
import MiniCarousel from "./template/MiniCarousel";

interface dataProps {
  data: getTrendingListResponse[];
}

const CarouselContainer: React.FC<dataProps> = ({ data }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className=" w-screen h-[85vh] ">
      <section className=" w-1/2  absolute -bottom-16  right-0  z-20 ">
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
      <div className="h-full">
        <Template item={data[index] || []} />
      </div>
    </div>
  );
};

export default CarouselContainer;
