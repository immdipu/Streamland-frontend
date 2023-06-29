"use client";
import React from "react";
import SearchCard from "../search/SearchCard";
import { serachItemProps } from "../../../types/searchTypes";

const PersonMovieShows = ({ data }: { data: serachItemProps[] }) => {
  return (
    <>
      <section className="mt-14">
        <div className="flex justify-between items-center sticky top-0">
          <h3 className="text-xl font-medium ">Movies and TV shows :</h3>
          <section></section>
        </div>

        <section className="grid py-10 grid-cols-autoFit gap-x-2 gap-y-9">
          {data.map((item) => {
            return <SearchCard key={item.id} {...item} />;
          })}
        </section>
      </section>
    </>
  );
};

export default PersonMovieShows;
