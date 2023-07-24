import CarouselContainer from "./component/carousel/CarouselContainer";
import { getTrendingListResponse } from "@/types/types";
import {
  NowPlaying,
  TrendingMovies,
  ContinueWatch,
  TrendingPerson,
} from "./component";
import { Metadata } from "next";

import { Apis } from "./tmdbApi/TmdbApi";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ShowMania | Home",
  other: {
    monetag: "7bc7a88836ba455ca44573ef4f1f8f5a",
  },
};

async function getTrendingList() {
  const res = await fetch(
    `${process.env.BASE_URL}/3/trending/all/day?api_key=${process.env.API_KEY}`
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
      {data ? (
        <section className=" relative overflow-hidden w-11/12 mx-auto rounded-3xl">
          <CarouselContainer data={data} />
        </section>
      ) : (
        <div>No data found</div>
      )}
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
