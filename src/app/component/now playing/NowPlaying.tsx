import React from "react";
import Slider from "../silder/Slider";

async function getNowPlaying() {
  const res = await fetch(
    `${process.env.BASE_URL}/3/movie/now_playing?api_key=${process.env.API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const NowPlaying = async () => {
  const res = await getNowPlaying();
  const data = res.results;
  return (
    <div className="px-6 max-md:px-1">
      <h2 className="font-medium pl-9 max-md:pl-6 my-4 text-xl text-_white ">
        Now Playing Movies
      </h2>
      <Slider type="MOVIE" data={data} className="nowplaying_movies" />
    </div>
  );
};

export default NowPlaying;
