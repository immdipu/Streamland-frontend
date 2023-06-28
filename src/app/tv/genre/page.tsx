import React from "react";
import { MovieGenreList, MoviesGrid } from "@/app/component";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinemaa | TV shows",
};

const page = () => {
  return (
    <div className="bg-_black_bg pt-20">
      <h2 className="text-_sidenav_bg text-2xl pl-16">TV Shows</h2>
      <section>
        <MovieGenreList genre="TV" />
      </section>
      <section className="bg-_black_bg">
        <MoviesGrid genre={"TV"} />
      </section>
    </div>
  );
};
export default page;
