"use client";
import React, { useEffect } from "react";
import { Apis } from "@/app/tmdbApi/TmdbApi";
import movieTrailer from "movie-trailer";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import clsx from "clsx";

interface TrailerProps {
  id?: number;
  type: "MOVIE" | "TV";
  year?: string;
  title: string;
}

const Trailer: React.FC<TrailerProps> = ({ year, title, type }) => {
  const [trailer, setTrailer] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showSideBar, setShowSideBar] = React.useState<boolean>(false);
  const [currentTrailer, setCurrentTrailer] = React.useState<string>("");

  const getTrailer = async ({
    title,
    type,
  }: {
    title: string;
    type: "MOVIE" | "TV";
  }) => {
    setLoading(true);
    try {
      console.log(title);
      const response = await movieTrailer(title, {
        id: true,
        multi: true,
        videoType: type === "MOVIE" ? "movie" : "tv",
      });
      setTrailer(response);
      setCurrentTrailer(response[0]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrailer({ title, type });
  }, [title, type]);

  const handleToggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  return (
    <>
      <div
        className={clsx(
          "w-full h-full fixed bg-neutral-900 bg-opacity-40",
          showSideBar ? "block" : "hidden"
        )}
        onClick={handleToggleSideBar}
      ></div>
      <button
        onClick={handleToggleSideBar}
        className={clsx(
          "  absolute z-50 right-5  duration-200 transition-all ease-linear hover:bg-neutral-800 p-3 rounded-full top-1 ",
          showSideBar
            ? "text-neutral-100 bg-transparent"
            : "text-neutral-300 bg-neutral-700"
        )}
      >
        {showSideBar ? (
          <AiFillCloseCircle className="text-neutral-300 text-xl " />
        ) : (
          <BiMenuAltLeft className="text-neutral-300 text-xl" />
        )}
      </button>
      <section
        className={clsx(
          "absolute right-0  bottom-0 transition-all duration-200 ease-in-out top-0 h-full overflow-y-auto bg-neutral-900",
          showSideBar ? "w-1/2" : "w-0"
        )}
      >
        <h2 className="py-3 px-5 text-xl font-medium text-neutral-100 sticky top-0 bg-neutral-900">
          More Trailer
        </h2>
        <div className="flex overflow-y-auto w-full h-full  flex-col gap-5 justify-center items-center ">
          {loading ? (
            <div>Loading</div>
          ) : !trailer || trailer?.length === 0 ? (
            <div className="mt-8">No Trailer Found</div>
          ) : (
            trailer.map((trailer) => (
              <div key={trailer} className="relative">
                <iframe
                  width="90%"
                  height="80%"
                  className="rounded-xl shadow-xl px-0 mx-0 shadow-neutral-800"
                  src={`https://www.youtube.com/embed/${trailer}`}
                ></iframe>
                <div
                  onClick={() => {
                    setShowSideBar(false);
                    setCurrentTrailer(`${trailer}?autoplay=1`);
                  }}
                  className=" cursor-pointer z-30 absolute w-full h-full left-0 right-0 bottom-0 top-0"
                />
              </div>
            ))
          )}
        </div>
      </section>
      {!trailer || trailer?.length === 0 ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="text-2xl">No Trailer Found</div>
        </div>
      ) : (
        <iframe
          width="100%"
          allowFullScreen
          allow="autoplay"
          height="100%"
          src={`https://www.youtube.com/embed/${currentTrailer}`}
        ></iframe>
      )}
    </>
  );
};

export default Trailer;
