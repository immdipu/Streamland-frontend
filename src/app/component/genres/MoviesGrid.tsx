"use client";
import React, { useEffect, useState } from "react";
import { NowPlayingResponse } from "@/types/types";
import SingleCard from "../silder/SingleCard";
import SmallLoader from "../loader/SmallLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";

const MoviesGrid = () => {
  const [data, setData] = useState<NowPlayingResponse[] | null>(null);
  const searchParams = useSearchParams();
  const genreId = searchParams.get("tab");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getMovies(id: string, intialPage: number) {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const { results }: { results: NowPlayingResponse[] } = await res.json();
      setData(results);
      setLoading(false);
      return results;
    }
    if (genreId) {
      getMovies(genreId, currentPage);
    } else {
      {
        getMovies("28", currentPage);
      }
    }
  }, [currentPage, genreId]);

  if (loading) {
    <>
      <div>
        <SmallLoader size={40} />
      </div>
    </>;
  }

  const HandleNextpage = async () => {
    setCurrentPage(currentPage + 1);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&with_genres=28`
      );
      const { results }: { results: NowPlayingResponse[] } = await res.json();
      if (data) {
        setData([...data, ...results]);
      } else {
        setData(results);
      }
    } catch (error) {}
  };

  return (
    <div>
      {data && (
        <InfiniteScroll
          dataLength={data.length}
          next={() => HandleNextpage}
          hasMore={true}
          loader={
            <h4 className="text-white text-center mb-3 ">
              <SmallLoader size={30} />
            </h4>
          }
          endMessage={<p className="text-white text-center">End</p>}
          className=" pl-16 mt-16 h-28 overflow-hidden pr-6 grid gap-y-9  grid-cols-[repeat(auto-fit,minmax(167px,1fr))] border"
        >
          {data &&
            data?.length > 0 &&
            data?.map((item) => <SingleCard key={item.id} {...item} />)}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MoviesGrid;
