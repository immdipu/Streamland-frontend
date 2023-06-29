"use client";
import React, { useEffect, useState } from "react";
import { SingleShowProps } from "@/types/types";
import Images from "../ImageComponent/Image";
import { AiFillPlayCircle } from "react-icons/ai";
import Link from "next/link";

async function getSingleMovie(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const ContinueWatch = () => {
  const movieId = localStorage.getItem("movieId");
  const [moviedata, setMoviedata] = useState<SingleShowProps | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (movieId) {
        try {
          const data: SingleShowProps = await getSingleMovie(movieId);
          setMoviedata(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [movieId]);

  if (!movieId) {
    return <></>;
  }

  return (
    <div className="px-9 my-14 max-md:px-1">
      <h2 className="font-medium pl-9 max-md:pl-6 my-4 text-xl text-_white ">
        Continue Watching
      </h2>
      <section className="px-8 max-md:px-1 mt-5">
        {moviedata && (
          <div className="w-72 relative">
            <Images
              src={`https://image.tmdb.org/t/p/original/${moviedata.backdrop_path}`}
              width={300}
              height={300}
              alt={moviedata.title ?? moviedata.name}
              ImageWidth={"full"}
              Imageheight={150}
              rounded="2xl"
            />
            <Link
              href={`/player/movie/${movieId}`}
              prefetch={false}
              className="absolute bg-gradient-to-t rounded-2xl from-neutral-800 inset-0 group items-end flex hover:backdrop-blur-[2px] "
            >
              <h2 className="text-lg ml-3 mb-2  w-full  max-md:text-center text-white h-fit font-medium tracking-wide">
                {moviedata.title}{" "}
                <span className="text-[10px] px-1 rounded-lg border border-_light_white border-opacity-50 font-light">
                  Movie
                </span>
              </h2>
              <AiFillPlayCircle className="text-8xl mr-4 mb-1 scale-0  group-hover:scale-110 transition-transform duration-150 ease-in-out " />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default ContinueWatch;
