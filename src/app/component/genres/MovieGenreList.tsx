"use client";
import React, { useEffect, useState } from "react";
import { MoviesgenresList, TvgenresList } from "@/utils/genreData";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

interface MovieGenreListTypes {
  genre: "MOVIE" | "TV";
}

const MovieGenreList: React.FC<MovieGenreListTypes> = ({ genre }) => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    genreId ?? genre === "MOVIE" ? "28" : "10759"
  );

  useEffect(() => {
    if (genre === "MOVIE") {
      setActiveTab(genreId ?? "28");
    }
    if (genre === "TV") {
      setActiveTab(genreId ?? "10759");
    }
  }, [genreId, genre]);

  return (
    <div>
      <div className="">
        {genre === "MOVIE" ? (
          <>
            <section className="flex flex-wrap max-md:justify-center gap-3 max-md:gap-2 pl-16 max-md:pl-1  mt-6">
              <Link
                href={"/movie/genre/?tab=trendingmovie"}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "trendingmovie"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Trending Movies
              </Link>
              <Link
                href={"/movie/genre/?tab=topratedmovie"}
                className={clsx(
                  " px-2 text-sm py-1 max-md:text-xs cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "topratedmovie"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Top Rated Movies
              </Link>
              <Link
                href={"/movie/genre/?tab=popularmovie"}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "popularmovie"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Popular Movies
              </Link>
              <Link
                href={"/movie/genre/?tab=upcomingmovie"}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "upcomingmovie"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Upcoming Movies
              </Link>
            </section>
            <section className="flex flex-wrap gap-3 max-md:gap-2 max-md:justify-center max-md:pl-1 pl-16 mt-5">
              {MoviesgenresList.map((item) => (
                <Link
                  href={`/movie/genre/?tab=${item.id}`}
                  key={item.id}
                  className={clsx(
                    " px-2 text-sm py-1 max-md:text-xs  cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                    activeTab === item.id.toString()
                      ? "bg-_blue text-_sidenav_bg"
                      : "bg-_genre_chip_bg"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </section>
          </>
        ) : (
          <>
            <section className="flex flex-wrap gap-3 pl-16  mt-6">
              <Link
                href={`/tv/genre/?tab=trendingtv`}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "trendingtv"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Trending show
              </Link>
              <Link
                href={`/tv/genre/?tab=airingtoday`}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "airingtoday"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Airing Today
              </Link>
              <Link
                href={`/tv/genre/?tab=ontheair`}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "ontheair"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                On The Air
              </Link>
              <Link
                href={`/tv/genre/?tab=populartv`}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "populartv"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Popular Show
              </Link>
              <Link
                href={`/tv/genre/?tab=topratedtv`}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === "topratedtv"
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_genre_chip_bg"
                )}
              >
                Top Rated Show
              </Link>
            </section>
            <section className="flex flex-wrap gap-3 pl-16 mt-4">
              {TvgenresList.map((item) => (
                <Link
                  href={`/tv/genre/?tab=${item.id}`}
                  key={item.id}
                  className={clsx(
                    " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                    activeTab === item.id.toString()
                      ? "bg-_blue text-_sidenav_bg"
                      : "bg-_genre_chip_bg"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieGenreList;
