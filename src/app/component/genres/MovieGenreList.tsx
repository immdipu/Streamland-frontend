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
      <ul className="flex flex-wrap gap-3 pl-16 mt-6">
        {genre === "MOVIE"
          ? MoviesgenresList.map((item) => (
              <Link
                href={`movie/genre/?tab=${item.id}`}
                key={item.id}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === item.id.toString()
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_sidenav_bg"
                )}
              >
                {item.name}
              </Link>
            ))
          : TvgenresList.map((item) => (
              <Link
                href={`tv/genre/?tab=${item.id}`}
                key={item.id}
                className={clsx(
                  " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                  activeTab === item.id.toString()
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_sidenav_bg"
                )}
              >
                {item.name}
              </Link>
            ))}
      </ul>
    </div>
  );
};

export default MovieGenreList;
