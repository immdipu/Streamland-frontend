import CarouselContainer from "./component/carousel/CarouselContainer";
import { getTrendingListResponse } from "@/types/types";
import NowPlaying from "./component/now playing/NowPlaying";

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
  return (
    <div className="bg-_black_bg min-h-screen">
      {data ? (
        <section className=" relative overflow-hidden w-11/12 mx-auto rounded-3xl">
          <CarouselContainer data={data} />
        </section>
      ) : (
        <div>No data found</div>
      )}
      <section className="mt-8">
        <div>
          <h2 className="font-medium pl-12 text-xl text-_white ">
            Now Playing Movies
          </h2>
          <NowPlaying />
        </div>
      </section>
    </div>
  );
}
