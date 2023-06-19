"use client";
import React, { useEffect, useState } from "react";

const MoviesGrid = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getMovies(id: number, intialPage: number) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&include_adult=false&page=${intialPage}&with_genres=${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(data);
      return data;
    }
    getMovies(28, 1);
  }, []);

  return <div>MoviesGrid</div>;
};

export default MoviesGrid;
