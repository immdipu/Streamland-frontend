import React from "react";
import Images from "../ImageComponent/Image";
import notFound from "../../../../public/notFound.png";
import Link from "next/link";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GiRoundStar } from "react-icons/gi";
import { serachItemProps } from "@/types/searchTypes";
import AddToWatchlist from "../Buttons/AddToWatchlist";

const SearchCard: React.FC<serachItemProps> = ({
  adult,
  id,
  media_type,
  popularity,
  original_language,
  name,
  original_name,
  original_title,
  poster_path,
  profile_path,
  first_air_date,
  release_date,
  title,
  vote_average,
}) => {
  return (
    <>
      <div className="group relative rounded-lg flex-grow-0 max-md:w-28 w-36 flex-shrink-0">
        <AddToWatchlist
          media_type={media_type === "movie" ? "movie" : "tv"}
          id={id}
          release_date={release_date}
          first_air_date={first_air_date}
          title={title}
          name={name}
          poster_path={poster_path ?? ""}
          vote_average={vote_average}
        />
        <Link
          href={`/${media_type === "movie" ? "movie" : ""}${
            media_type === "tv" ? "tv" : ""
          }${media_type === "person" ? "person" : ""}/${id}`}
          prefetch={false}
        >
          {poster_path ? (
            <Images
              src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
              width={125}
              height={0}
              alt={title}
            />
          ) : profile_path ? (
            <Images
              src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
              width={125}
              height={0}
              alt={title}
            />
          ) : (
            <Images src={notFound.src} width={500} height={500} alt={title} />
          )}

          <h3
            id={`movie${id}`}
            className="text-base py-2 whitespace-nowrap overflow-hidden text-ellipsis font-medium  text-white"
          >
            {media_type === "movie" && title}
            {(media_type === "tv" || media_type === "person") && name}
          </h3>
          <ReactTooltip
            anchorSelect={`#movie${id}`}
            place="bottom"
            content={title ?? name}
          />
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <p className="text-_light_white font-normal ">
                {release_date?.split("-")[0]}
                {first_air_date?.split("-")[0]}
              </p>
              <p className="flex gap-1  text-_light_white items-center">
                <span>{vote_average?.toFixed(1)}</span>
                <GiRoundStar className="text-yellow-500 mb-[1px]" />
              </p>
            </div>

            <span className=" border-_light_white tracking-wider border-[1px] border-opacity-25 font-thin px-2 rounded-md py-1 scale-90 text-_white">
              {media_type === "movie" && "Movie"}
              {media_type === "tv" && "TV"}
              {media_type === "person" && "Person"}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SearchCard;
