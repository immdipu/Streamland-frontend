"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getTrendingListResponse } from "@/types/types";
import { FaImdb } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface dataProps {
  data: getTrendingListResponse[];
}

const CarouselContainer: React.FC<dataProps> = ({ data }) => {
  console.log(data);
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={false}
      emulateTouch
      autoPlay
      infiniteLoop
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
              <div className="w-1/2 max-md:w-10/12  flex flex-col gap-2 mt-5">
                <h3 className="font-bold max-md:text-2xl leading-[45px] max-xl:text-xl text-start font-Inter text-4xl text-_sidenav_bg">
                  {item.media_type === "movie"
                    ? item.title || item.original_title
                    : item.name}
                </h3>
                <div className="flex items-center gap-2 ">
                  <FaImdb className="text-yellow-400 text-xl" />
                  <p className="text-_light_white text-sm font-sans">
                    {Number(item.vote_average?.toFixed(1))}
                  </p>
                  <span className="text-_welcometext_lightblue ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 font-Inter text-[13px]">
                    {item.media_type === "movie" && item?.release_date
                      ? moment(item?.release_date).format("YYYY")
                      : ""}
                    {item.media_type === "tv" && item?.first_air_date
                      ? moment(item?.first_air_date).format("YYYY")
                      : ""}
                  </span>
                  <span className="border-_light_white ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 border-[1px] rounded-2xl px-3 py-1 leading-none text-xs text-_light_white ">
                    {item.media_type === "movie"
                      ? "Movie"
                      : item.media_type === "tv"
                      ? "TV"
                      : ""}
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <Link
                  href={`${item.media_type === "movie" ? "movie" : ""}${
                    item.media_type === "tv" ? "tv" : ""
                  }/${item.id}`}
                  prefetch={false}
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
