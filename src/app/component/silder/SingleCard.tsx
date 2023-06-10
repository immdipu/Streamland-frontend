import React from "react";
import Image from "next/image";
import { NowPlayingResponse } from "@/types/types";

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
    <div className=" rounded-lg flex-grow-0 flex-shrink-0">
      <Image
        src={`https://image.tmdb.org/t/p/original/${poster_path!}`}
        width={125}
        height={0}
        alt={title ?? "poster"}
        style={{ objectFit: "cover" }}
        className="rounded-lg w-40 h-auto"
      />
    </div>
  );
};

export default SingleCard;
