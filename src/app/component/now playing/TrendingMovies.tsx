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
      <div className="px-6 max-md:px-1  pb-6 mt-10">
        <h2 className="font-medium pl-9 max-md:pl-6 my-6 text-xl text-_white ">
          Popular Movies
        </h2>
        <Slider
          type="MOVIE"
          data={data}
          className="trending_movies_container"
        />
      </div>
    </div>
  );
};

export default TrendingMovies;
