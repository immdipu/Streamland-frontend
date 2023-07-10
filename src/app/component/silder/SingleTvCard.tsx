"use client";
import React from "react";
import Image from "next/image";
import { singleTVShowProps } from "@/types/types";
import Link from "next/link";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GiRoundStar } from "react-icons/gi";
import Logo from "../../../../public/cinemaalogo.png";
import Images from "../ImageComponent/Image";

const SingleTvCard: React.FC<singleTVShowProps> = ({
  id,
  backdrop_path,
  genre_ids,
  name,
  poster_path,
  vote_average,
  first_air_date,
}) => {
  return (
    <Link
      href={`/tv/${id}`}
      className=" rounded-lg flex-grow-0 w-36 max-md:w-28 flex-shrink-0"
      prefetch={false}
    >
      {poster_path ? (
        <Images
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          width={125}
          height={0}
          alt={name}
        />
      ) : (
        <Images src={Logo.src} width={500} height={500} alt={name} />
      )}

      <h3
        id={`movie${id}`}
        className="text-base py-2 max-md:text-xs whitespace-nowrap overflow-hidden text-ellipsis font-medium  text-white"
      >
        {name}
      </h3>
      <ReactTooltip
        anchorSelect={`#movie${id}`}
        place="bottom"
        content={name}
      />
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <p className="text-_light_white max-md:text-xxs font-normal ">
            {first_air_date ? first_air_date.split("-")[0] : ""}
          </p>
          <p className="flex gap-1 max-md:text-xxs  text-_light_white items-center">
            <span>{vote_average?.toFixed(1)}</span>
            <GiRoundStar className="text-yellow-500 mb-[1px]" />
          </p>
        </div>

        <span className="max-md:text-xxs max-md:py-0 max-md:px-1 border-_light_white tracking-wider border-[1px] border-opacity-25 font-thin px-2 rounded-md py-1 scale-90 text-_white">
          TV show
        </span>
      </div>
    </Link>
  );
};

export default SingleTvCard;
