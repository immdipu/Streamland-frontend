import React from "react";
import Slider from "../silder/Slider";

async function getNowPlaying() {
  const res = await fetch(
    `${process.env.BASE_URL}/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const TrendingMovies = async () => {
  const res = await getNowPlaying();
  const data = res.results;
  return (
    <div>
      <div className="px-6">
        <h2 className="font-medium pl-9 my-4 text-xl text-_white ">
          Popular Movies
        </h2>
        <Slider data={data} className="trending_movies_container" />
      </div>
    </div>
  );
};

export default TrendingMovies;
