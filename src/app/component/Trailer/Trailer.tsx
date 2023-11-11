"use client";
import React, { useEffect } from "react";
import { Apis } from "@/app/tmdbApi/TmdbApi";

const Trailer = () => {
  useEffect(() => {
    Apis.GetYouTubeTrailer().then((res) => {
      console.log("Trailer response", res);
    });
  }, []);

  return <div>Trailer</div>;
};

export default Trailer;
