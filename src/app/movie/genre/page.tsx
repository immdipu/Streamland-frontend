import React, { Suspense } from "react";
import { MovieGenreList, MoviesGrid } from "@/app/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShowMania | Movies Genre",
};

const page = () => {
  return (
    <div className="bg-_black_bg pt-20">
      <h2 className="text-_sidenav_bg text-2xl max-md:pl-5 pl-16">Movies</h2>
      <section>
        <Suspense>
          <MovieGenreList genre="MOVIE" />
        </Suspense>
      </section>
      <section className="bg-_black_bg">
        <Suspense>
          <MoviesGrid genre="MOVIE" />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
