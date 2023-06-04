"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getTrendingListResponse } from "@/types/types";
import { FaImdb } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface dataProps {
  data: getTrendingListResponse[];
}

const CarouselContainer: React.FC<dataProps> = ({ data }) => {
  console.log(data);
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      dynamicHeight={false}
    >
      {data.map((item: getTrendingListResponse) => {
        return (
          <div key={item.id} className="h-full relative">
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path!}`}
              width={500}
              height={500}
              priority
              alt={(item.title || item.original_title) ?? "poster"}
              style={{ objectFit: "cover", height: "100%" }}
            />
            <section className="absolute flex flex-col pl-10 justify-between inset-0 bg-gradient-to-r from-_black_bg   p-6">
              <div className="w-1/2  flex flex-col gap-2 mt-5">
                <h3 className="font-bold leading-[45px] text-start font-Inter text-4xl text-_sidenav_bg">
                  {item.media_type === "movie"
                    ? item.title || item.original_title
                    : item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <FaImdb className="text-yellow-400 text-xl" />
                  <p className="text-_light_white text-sm font-sans">
                    {Number(item.vote_average?.toFixed(1))}
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <Link
                  href={"/movie/id"}
                  className="bg-blue-500 rounded-xl hover:opacity-75 transition-opacity duration-300 ease-linear block text-white  py-3 px-5 font-medium font-Inter text-sm w-fit"
                >
                  Watch
                </Link>
              </div>
            </section>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselContainer;
