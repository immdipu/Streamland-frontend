"use client";
import React, { useEffect, useState } from "react";
import {
  MoviesTab,
  MoviesgenresList,
  TvTab,
  TvgenresList,
} from "@/utils/genreData";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GenreChip from "./GenreChip";

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
            <section className="flex flex-wrap max-md:justify-center gap-3  max-md:gap-2 pl-16 max-md:pl-1  mt-6">
              {MoviesTab.map((item) => (
                <GenreChip
                  activeTab={activeTab}
                  genre={item.genre === "MOVIE" ? "MOVIE" : "TV"}
                  tab={item.tab}
                  title={item.title}
                  key={item.tab}
                />
              ))}
            </section>
            <section className="flex flex-wrap gap-3 max-md:gap-2 max-md:justify-center max-md:pl-1 pl-16 mt-5">
              {MoviesgenresList.map((item) => (
                <GenreChip
                  activeTab={activeTab}
                  genre="MOVIE"
                  tab={item.id}
                  title={item.name}
                  key={item.id}
                />
              ))}
            </section>
          </>
        ) : (
          <>
            <section className="flex flex-wrap max-md:pl-1 max-md:gap-2 max-md:justify-center  gap-3 pl-16  mt-6">
              {TvTab.map((item) => (
                <GenreChip
                  activeTab={activeTab}
                  genre={item.genre === "MOVIE" ? "MOVIE" : "TV"}
                  tab={item.tab}
                  title={item.title}
                  key={item.tab}
                />
              ))}
            </section>
            <section className="flex flex-wrap gap-3 max-md:pl-1 max-md:gap-2 max-md:justify-center pl-16 mt-4">
              {TvgenresList.map((item) => (
                <GenreChip
                  activeTab={activeTab}
                  genre="TV"
                  tab={item.id}
                  title={item.name}
                  key={item.id}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieGenreList;
