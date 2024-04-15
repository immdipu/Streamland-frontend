import React from "react";
import { getTrendingListResponse } from "@/types/types";
import Title from "../atom/Title";
import Genre from "../atom/Genre";
import ReleaseDate from "../atom/ReleaseDate";
import Rating from "../atom/Rating";

interface DetailsProps {
  item: getTrendingListResponse;
}

const Details: React.FC<DetailsProps> = ({ item }) => {
  return (
    <div className="  flex flex-col gap-2  mt-32">
      <Title
        media_type={item.media_type}
        name={item.name}
        original_title={item.original_title}
        title={item.title}
      />

      <div className="gap-3 h-fit flex py-2">
        <Genre data={item.genre_ids || []} media_type={item.media_type} />
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

        <ReleaseDate
          first_air_date={item.first_air_date}
          media_type={item.media_type}
          release_date={item.release_date}
        />

        <Rating rating={item.popularity} />

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
  );
};

export default Details;