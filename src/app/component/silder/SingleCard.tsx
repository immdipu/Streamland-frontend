import React from "react";
import Image from "next/image";
import { NowPlayingResponse } from "@/types/types";
import Link from "next/link";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const SingleCard: React.FC<NowPlayingResponse> = ({
  id,
  adult,
  backdrop_path,
  genre_ids,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  video,
  vote_average,
  vote_count,
}) => {
  return (
    <Link
      href={`movie/${id}`}
      className=" rounded-lg flex-grow-0 w-36 flex-shrink-0"
    >
      <Image
        src={`https://image.tmdb.org/t/p/original/${poster_path!}`}
        width={125}
        height={0}
        alt={title ?? "poster"}
        style={{ objectFit: "cover" }}
        className="rounded-lg w-36 h-52 select-none"
      />
      <h3
        id={`movie${id}`}
        className="text-sm py-2 whitespace-nowrap overflow-hidden text-ellipsis text-_white"
      >
        {title}
      </h3>
      <ReactTooltip
        anchorSelect={`#movie${id}`}
        place="bottom"
        content={title}
      />
    </Link>
  );
};

export default SingleCard;
