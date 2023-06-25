import React from "react";
import Slider from "../silder/Slider";
import { NowPlayingResponse } from "@/types/types";

const ReccomendationMovie = ({
  results,
  type,
}: {
  results: NowPlayingResponse[];
  type: "MOVIE" | "TV";
}) => {
  return (
    <div>
      <h3 className="text-_white  text-2xl mb-4 font-medium pl-10">
        Recommendation
      </h3>
      <Slider type={type} className="recommedation_movies" data={results} />
    </div>
  );
};

export default ReccomendationMovie;
