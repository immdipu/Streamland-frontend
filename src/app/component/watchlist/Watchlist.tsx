"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import MoviesList from "./MoviesList";

const Watchlist = () => {
  const user = useAppSelector((state) => state.auth);

  return (
    <div>
      <MoviesList />
    </div>
  );
};

export default Watchlist;
