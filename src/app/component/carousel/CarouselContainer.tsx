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
      infiniteLoop
      dynamicHeight={false}
      className="!h-full"
    >
      {data.map((item: getTrendingListResponse) => {
        return (
          <div key={item.id} className="h-full  relative">
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path!}`}
              width={500}
              height={500}
              priority
              alt={(item.title || item.original_title) ?? "poster"}
              style={{ objectFit: "cover", height: "100%" }}
            />
            <section className="absolute  flex flex-col pl-10 justify-between inset-0 bg-gradient-to-r from-_black_bg   p-6">
              <div className="  flex flex-col gap-2    mt-32">
                <h3 className="font-semibold line-clamp-2 max-md:text-2xl leading-[45px] max-xl:text-xl text-start font-Inter text-3xl text-_sidenav_bg">
                  {item.media_type === "movie"
                    ? item.title || item.original_title
                    : item.name}
                </h3>
                <div className="gap-3 h-fit flex py-2">
                  {item.genre_ids?.map((id) => {
                    return (
                      <GenresChip
                        Type={item.media_type === "movie" ? "MOVIE" : "TV"}
                        id={id}
                        key={id}
                        name={
                          item.media_type === "movie"
                            ? MoviesgenresObject[id]
                            : TvgenresObject[id]
                        }
                      />
                    );
                  })}
                </div>

                <div className="flex items-center gap-2  mt-1 ml-px">
                  <div>
                    <p className="text-_light_white text-smm">
                      {" "}
                      {item.media_type === "movie"
                        ? "Movie"
                        : item.media_type === "tv"
                        ? "TV Show"
                        : ""}
                    </p>
                  </div>

                  <div className="inline-flex  items-center  ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-[2px] before:rounded-full before:h-[2px]  leading-none text-xs text-_light_white">
                    <MdOutlineStarPurple500 className="text-yellow-400 text-lg mr-1" />
                    <p className="text-_light_white  font-Inter mt-1 text-smm">
                      {Number(item.vote_average?.toFixed(1))}
                    </p>
                  </div>

                  <span className="text-_welcometext_lightblue ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-[2px] before:rounded-full before:h-[2px] font-Inter text-[13px]">
                    {item.media_type === "movie" && item?.release_date
                      ? moment(item?.release_date).format("YYYY")
                      : ""}
                    {item.media_type === "tv" && item?.first_air_date
                      ? moment(item?.first_air_date).format("YYYY")
                      : ""}
                  </span>
                  <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-[2px] before:rounded-full before:h-[2px]  leading-none text-xs text-_light_white ">
                    {item.original_language?.toUpperCase()}
                  </span>
                </div>
                <div className=" text-start w-1/2 mt-5 group   font-Inter">
                  <p className="text-_light_white line-clamp-3 group-hover:text-white leading-6 duration-200 transition-all ease-linear group-hover:line-clamp-none  text-sm">
                    {item.overview}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex gap-5">
                <Link
                  href={`${item.media_type === "movie" ? "movie" : ""}${
                    item.media_type === "tv" ? "tv" : ""
                  }/${item.id}`}
                  prefetch={false}
                  className="bg-blue-500 rounded-md bg-opacity-20 backdrop:blur-sm  hover:opacity-75 transition-opacity duration-300 ease-linear block text-white  py-3 px-5 font-medium font-Inter text-sm w-fit"
                >
                  Watch Now
                </Link>
                <AddToWatchlist {...item} showAddToWatchlist={true} />
              </div>
            </section>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselContainer;
