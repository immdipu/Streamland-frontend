import React from "react";

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
  return <div></div>;
};

export default NowPlaying;
