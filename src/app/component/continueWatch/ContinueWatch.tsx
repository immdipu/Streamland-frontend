"use client";
import { useEffect, useState } from "react";
import WatchCard from "./WatchCard";

async function getSingleMovie(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${process.env.NEXT_PUBLIC_LAN}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getSingleShow(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${process.env.NEXT_PUBLIC_LAN}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const ContinueWatch = () => {
  const [moviedata, setMoviedata] = useState<SingleShowProps | null>(null);
  const [tvdata, setTvdata] = useState<SingleShowProps | null>(null);
  const [MovieId, setMovieId] = useState<null | string>(null);
  const [tvId, setTveId] = useState<null | string>(null);

  useEffect(() => {
    const movieId = localStorage.getItem("movieId");
    const tvId = localStorage.getItem("tvId");
    if (movieId) {
      setMovieId(movieId);
    }
    if (tvId) {
      setTveId(tvId);
    }
    async function fetchData() {
      if (movieId) {
        try {
          const data: SingleShowProps = await getSingleMovie(movieId);
          setMoviedata(data);
        } catch (error) {
          console.log(error);
        }
      }
      if (tvId) {
        try {
          const data: SingleShowProps = await getSingleShow(tvId);
          setTvdata(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

  if (!MovieId && !tvId) {
    return <></>;
  }

  console.log(moviedata, tvdata);

  return (
    <div className="px-9 my-14 max-md:px-1  ">
      <h2 className="font-medium pl-9 max-md:pl-6 my-4 text-xl text-_white ">
        Continue Watching
      </h2>
      <section className="px-8 flex gap-10 overflow-x-auto max-md:px-1 mt-5 ">
        {moviedata && (
          <WatchCard
            backdrop_path={moviedata.backdrop_path}
            id={moviedata.id}
            title={moviedata.title ?? "Movie"}
            type="movie"
          />
        )}
        {tvdata && (
          <WatchCard
            backdrop_path={tvdata.backdrop_path}
            id={tvdata.id}
            title={tvdata.name ?? tvdata.original_name ?? "Movie"}
            type="tv"
          />
        )}
      </section>
    </div>
  );
};

export default ContinueWatch;
