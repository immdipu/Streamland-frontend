import React from "react";
import Seasons from "@/app/component/seasons/Seasons";
import { SingleShowProps } from "@/types/types";

async function getSingleTv(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/3/tv/${id}?api_key=${process.env.API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }: any) {
  const res: SingleShowProps = await getSingleTv(params.id);
  return {
    title: res.title ?? res.name,
  };
}

const page = async ({ params }: any) => {
  const res: SingleShowProps = await getSingleTv(params.id);

  return (
    <div className="bg-_black_bg pt-20">
      <h1 className="text-_white text-3xl font-bold pt-6 max-md:pl-2 max-md:text-xl pl-14">
        {res.name}
      </h1>
      {res.seasons && <Seasons Tvshowdata={res} seasons={res.seasons} />}
    </div>
  );
};

export default page;
