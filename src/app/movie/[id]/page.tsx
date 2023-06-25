import React from "react";
import SingleShow from "@/app/component/single_movie_tv_show/SingleShow";
import { SingleShowProps } from "@/types/types";

async function getSingleMovie(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=credits,recommendations,similar`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async ({ params }: any) => {
  const res: SingleShowProps = await getSingleMovie(params.id);
  console.log(res);
  return (
    <div className="bg-_black_bg">
      <SingleShow {...res} TYPE="MOVIE" />
    </div>
  );
};

export default page;
