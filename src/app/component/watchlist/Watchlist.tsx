"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import MoviesList from "./MoviesList";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import LoadingAnimation from "./LoadingAnimation";
import { AddMediaResponse } from "@/types/userTypes";

const Watchlist = () => {
  const user = useAppSelector((state) => state.auth);
  const { isLoading, data, error } = useQuery(
    ["watchlist", user.isUserAuthenticated],
    () => userApis.GetAllMedia(),
    { enabled: user.isUserAuthenticated }
  );

  if (!user.isUserAuthenticated) {
    return (
      <div>
        <h2 className="text-2xl  mt-5">Movies Watchlist</h2>
        <div className=" w-full h-96 grid place-content-center ">
          <p className="text-xl text-neutral-500">
            Please log in to see your watchlist.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <h2 className="text-2xl  mt-5">Movies Watchlist</h2>
        <div className="flex flex-col gap-2 mt-10">
          <LoadingAnimation />
          <LoadingAnimation />
          <LoadingAnimation />
          <LoadingAnimation />
          <LoadingAnimation />
          <LoadingAnimation />
          <LoadingAnimation />
        </div>
      </>
    );
  }

  return (
    <div>
      <h2 className="text-2xl  mt-5">Movies Watchlist</h2>
      <>
        {data.length > 0 &&
          data.map((item: AddMediaResponse, index: number) => {
            return <MoviesList key={item.id} {...item} Index={index} />;
          })}
      </>
    </div>
  );
};

export default Watchlist;
