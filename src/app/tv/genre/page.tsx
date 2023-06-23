import React from "react";
import { MovieGenreList } from "@/app/component";

const page = () => {
  return (
    <div className="bg-_black_bg pt-20">
      <h2 className="text-_sidenav_bg text-2xl pl-16">TV Shows</h2>
      <section>
        <MovieGenreList genre="TV" />
      </section>
      <section className="bg-_black_bg">{/* <MoviesGrid /> */}</section>
    </div>
  );
};
export default page;
