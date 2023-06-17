import React, { useState } from "react";
import { MovieGenreList } from "@/app/component";

const page = () => {
  return (
    <div className="bg-_black_bg pt-20">
      <h2 className="text-_sidenav_bg text-2xl pl-16">Movies</h2>
      <section>
        <MovieGenreList />
      </section>
    </div>
  );
};

export default page;
