import React, { useState } from "react";
import { MovieGenreList, MoviesGrid } from "@/app/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinemaa | Movies",
};

const page = () => {
  return (
    <div className="bg-_black_bg pt-20">
      <h2 className="text-_sidenav_bg text-2xl pl-16">Movies</h2>
      <section>
        <MovieGenreList genre="MOVIE" />
      </section>
      <section className="bg-_black_bg">
        <MoviesGrid genre="MOVIE" />
      </section>
    </div>
  );
};

export default page;
