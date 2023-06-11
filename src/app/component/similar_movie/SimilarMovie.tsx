import React, { useEffect } from "react";
import Slider from "../silder/Slider";

async function getSimilarMOvies(id: string | number) {
  const res = await fetch(
    `${process.env.BASE_URL}/3/movie/${id}/similar?api_key=${process.env.API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const SimilarMovie = async ({ id }: { id: string | number }) => {
  const { results } = await getSimilarMOvies(id);

  return (
    <div>
      <h3 className="text-_white  text-2xl mb-4 font-medium pl-10">
        Similar Movies
      </h3>
      <Slider data={results} />
    </div>
  );
};

export default SimilarMovie;
