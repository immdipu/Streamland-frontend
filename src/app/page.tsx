import CarouselContainer from "./component/carousel/CarouselContainer";
import { getTrendingListResponse } from "@/types/types";
import {
  NowPlaying,
  TrendingMovies,
  ContinueWatch,
  TrendingPerson,
  Users,
} from "./component";
import { Metadata } from "next";

import { Apis } from "./tmdbApi/TmdbApi";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ShowMania",
};

async function getTrendingList() {
  const res = await fetch(
    `${process.env.BASE_URL}/3/trending/all/day?api_key=${process.env.API_KEY}&language=${process.env.NEXT_PUBLIC_LAN}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const res = await getTrendingList();
  const data: getTrendingListResponse[] = res.results;
  const trendingPerson = Apis.TrendingPerson();
  return (
    <div className="bg-_black_bg pt-20">
      <section className=" relative gap-7  max-lg:flex-col  flex overflow-hidden w-11/12 h-72 max-lg:h-fit  mx-auto">
        {data ? (
          <div className="rounded-3xl overflow-hidden  shadow-2xl shrink ">
            <CarouselContainer data={data} />
          </div>
        ) : (
          <div>No data found</div>
        )}

        <Users />
      </section>
      <section className="mt-8">
        <div>
          <ContinueWatch />
        </div>
        <div>
          <NowPlaying />
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <TrendingPerson data={trendingPerson} />
          </Suspense>
        </div>
        <div>
          <TrendingMovies />
        </div>
      </section>
    </div>
  );
}
