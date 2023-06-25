import React from "react";
import Images from "../ImageComponent/Image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { singleEpisodeTypes } from "@/types/types";
import { SetStateAction } from "react";

interface EpisodeProps extends singleEpisodeTypes {
  setCurrentEpisode: React.Dispatch<SetStateAction<number>>;
}

const Episode: React.FC<EpisodeProps> = ({
  id,
  still_path,
  episode_number,
  air_date,
  gues_star,
  name,
  runtime,
  season_number,
  vote_average,
  overview,
  production_code,
  vote_count,
  setCurrentEpisode,
}) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={() => {
        setCurrentEpisode(episode_number);
        handleScrollToTop();
      }}
      className="flex gap-10 cursor-pointer bg-_dark_blue bg-opacity-50 mx-6 ml-14 rounded-md"
    >
      <div className="w-44 flex-shrink-0 ">
        <Images
          src={`https://image.tmdb.org/t/p/w500/${still_path}`}
          width={200}
          height={200}
          Imageheight={130}
          alt={name}
          ImageWidth={"full"}
        />
      </div>
      <section>
        <section className="pr-14 flex flex-col gap-3">
          <h2 className="text-_white mt-4 font-medium text-xl">
            <span className="font-semibold">{episode_number}.</span> {name}
          </h2>
          <p className="text-_light_white text-sm pl-2 font-light h-1/2 text-ellipsis overflow-hidden ">
            {overview}
            {id}
          </p>
        </section>
      </section>
    </div>
  );
};

export default Episode;
