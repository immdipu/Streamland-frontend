import React from "react";
import Slider from "../silder/Slider";
import { NowPlayingResponse } from "@/types/types";

async function getReccomededMOvies(id: string | number) {
  const res = await fetch(
    `${process.env.BASE_URL}/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const ReccomendationMovie = async ({ id }: { id: string | number }) => {
  const { results }: { results: NowPlayingResponse[] } =
    await getReccomededMOvies(id);
  return (
    <>
      {results.length > 0 ? (
        <div className="px-6 mt-12">
          <h3 className="text-_white  text-2xl mb-4 font-medium pl-10">
            Recommendation
          </h3>
          <Slider className="recommedation_movies" data={results} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReccomendationMovie;
