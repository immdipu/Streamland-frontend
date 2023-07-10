"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NowPlayingResponse, singleTVShowProps } from "@/types/types";
import SingleCard from "../silder/SingleCard";
import SmallLoader from "../loader/SmallLoader";
import SingleTvCard from "../silder/SingleTvCard";
import { Apis } from "@/app/tmdbApi/TmdbApi";

interface MovieGridTypes {
  genre: "MOVIE" | "TV";
}

const MoviesGrid: React.FC<MovieGridTypes> = ({ genre }) => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("tab");
  const [data, setData] = useState<NowPlayingResponse[] | singleTVShowProps[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentPageRef = useRef(1); // Use a ref to store the current page number

  useEffect(() => {
    const getMovies = async (id: string, page: number) => {
      setLoading(true);
      if (genreId === "trendingmovie") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.TrendingMovies(page);
        setLoading(false);
        return results;
      }
      if (genreId === "topratedmovie") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.TopRatedMovies(page);
        setLoading(false);
        return results;
      }
      if (genreId === "popularmovie") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.PopularMovies(page);
        setLoading(false);
        return results;
      }
      if (genreId === "upcomingmovie") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.UpcomingMovies(page);
        setLoading(false);
        return results;
      }
      if (genreId === "trendingtv") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.TrendingTv(page);
        setLoading(false);
        return results;
      }
      if (genreId === "airingtoday") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.AiringTodayTv(page);
        setLoading(false);
        return results;
      }
      if (genreId === "ontheair") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.OnTheAirTv(page);
        setLoading(false);
        return results;
      }
      if (genreId === "populartv") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.PopularTv(page);
        setLoading(false);
        return results;
      }
      if (genreId === "topratedtv") {
        const {
          results,
        }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
          await await Apis.TopRatedTv(page);
        setLoading(false);
        return results;
      }

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/3/discover/${
          genre === "MOVIE" ? "movie" : "tv"
        }?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const {
        results,
      }: { results: NowPlayingResponse[] | singleTVShowProps[] } =
        await res.json();
      setLoading(false);
      return results;
    };

    const fetchNextPage = async (page: number) => {
      try {
        const newItems = await getMovies(
          genreId ? genreId : genre === "MOVIE" ? "28" : "10759",
          page
        );
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setData(
            (prevData: NowPlayingResponse[] | singleTVShowProps[]) =>
              [...prevData, ...newItems] as typeof genre extends "MOVIE"
                ? NowPlayingResponse[]
                : singleTVShowProps[]
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 10
      ) {
        const nextPage = currentPageRef.current + 1;
        fetchNextPage(nextPage);
        currentPageRef.current = nextPage;
      }
    };

    const fetchInitialPage = async () => {
      const initialData = await getMovies(
        genreId ? genreId : genre === "MOVIE" ? "28" : "10759",
        1
      );

      if (initialData.length === 0) {
        setHasMore(false);
      } else {
        setData(initialData);
      }
    };

    fetchInitialPage();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [genreId, genre]);

  return (
    <div style={{ overflow: "auto" }} ref={containerRef}>
      {data && data.length > 0 ? (
        <div className="pl-16 mt-16 h-full grid gap-y-9 max-md:pl-1 max-md:grid-cols-smallAutoFit max-md:justify-center max-md:mb-16 grid-cols-[repeat(auto-fit,minmax(167px,1fr))]">
          {data.map((item) => {
            if (genre === "MOVIE") {
              return <SingleCard key={item.id} {...item} />;
            }
            if (genre === "TV") {
              return <SingleTvCard key={item.id} {...item} />;
            }
            return "";
          })}
        </div>
      ) : (
        <>
          <div className="bg-_black_bg grid place-content-center min-h-screen">
            <div className="text-_white">Loading...</div>
          </div>
        </>
      )}

      {loading && hasMore && (
        <div className="text-center py-4">
          <SmallLoader size={34} />
        </div>
      )}
      {!loading && !hasMore && <p className="text-white text-center">End</p>}
    </div>
  );
};

export default MoviesGrid;
