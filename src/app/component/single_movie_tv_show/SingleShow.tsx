import React from "react";
import Image from "next/image";
import { SingleShowProps } from "@/types/types";
import Genres from "./Genres";
import { convertMinutesToHours } from "@/utils/converter";
import { GiRoundStar } from "react-icons/gi";
import Cast from "../cast/Cast";
import SimilarMovie from "../similar_movie/SimilarMovie";
import ReccomendationMovie from "../reccomendation_movie/ReccomendationMovie";

const SingleShow: React.FC<SingleShowProps> = ({
  id,
  backdrop_path,
  poster_path,
  title,
  genres,
  runtime,
  release_date,
  vote_average,
  overview,
  credits,
}) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${backdrop_path!}`}
          width={1000}
          height={1000}
          quality={100}
          priority
          alt={title ?? "poster"}
          style={{ objectFit: "cover" }}
          className=" w-full h-[32rem] select-none object-top"
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-_black_bg inset-x-0 h-40" />
      </div>
      <section className="bg-_black_bg  -translate-y-12 rounded-t-[45px]">
        <div>
          <div className="w-52 h-72 absolute -translate-y-36 translate-x-16">
            <Image
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
              width={500}
              height={500}
              quality={100}
              alt={title ?? "poster"}
              style={{ objectFit: "cover" }}
              className=" w-full h-full rounded-2xl select-none"
            />
          </div>
          <section className="pl-72 h-60 py-6 flex justify-between">
            <div>
              <h2 className="text-4xl text-_show_title font-bold tracking-wide">
                {title}
              </h2>
              <div className="mt-4">
                <Genres data={genres} />
              </div>
              <div className="mt-3 pl-1 flex items-center gap-2">
                <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                  {runtime && convertMinutesToHours(runtime)}
                </span>
                <div className="bg-_white w-1 h-1 rounded-full mx-1 " />
                <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                  {release_date && release_date}
                </span>
                <div className="bg-_white w-1 h-1 rounded-full mx-1" />
                <div className="flex items-center gap-2 ">
                  <span className="text-_welcometext_lightblue text-xs">
                    {vote_average.toFixed(1)}
                  </span>
                  <GiRoundStar className="text-yellow-400 text-sm mb-[1px]" />
                </div>
              </div>
            </div>
            <div className=" mr-24 pt-3">
              <button className="text-_white  px-6 text-base tracking-wider py-2 rounded-lg bg-_genre_chip_bg">
                Watch
              </button>
            </div>
          </section>
          <section>
            <p className="text-_welcometext_lightblue font-light tracking-wide px-16 text-base font-Helvetica">
              {overview}
            </p>
          </section>
        </div>
        <section className="px-6 mt-10">
          <Cast data={credits.cast} />
        </section>
        <section className="px-6 mt-12">
          <SimilarMovie id={id} />
        </section>
        <section className="px-6 mt-12">
          <ReccomendationMovie id={id} />
        </section>
      </section>
    </div>
  );
};

export default SingleShow;
