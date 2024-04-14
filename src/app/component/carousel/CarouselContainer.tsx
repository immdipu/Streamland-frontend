"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getTrendingListResponse } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { MoviesgenresObject, TvgenresObject } from "@/utils/genreData";
import GenresChip from "@/app/component/ui/GenresChip";
import { MdOutlineStarPurple500 } from "react-icons/md";
import AddToWatchlist from "../Buttons/AddToWatchlist";
import Template from "./template/Template";

interface dataProps {
  data: getTrendingListResponse[];
}

const CarouselContainer: React.FC<dataProps> = ({ data }) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={false}
      emulateTouch
      infiniteLoop
      dynamicHeight={false}
      className="!h-full"
    >
      {data.map((item: getTrendingListResponse) => (
        <Template item={item} key={item.id} />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
