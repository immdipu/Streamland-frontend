/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, Suspense } from "react";
import { useAppSelector } from "@/redux/hooks";
import MoviesList from "./MoviesList";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import LoadingAnimation from "./LoadingAnimation";
import { AddMediaResponse } from "@/types/userTypes";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Watchlist = () => {
  const user = useAppSelector((state) => state.auth);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoading, data, error } = useQuery(
    ["watchlist", user.isUserAuthenticated],
    () => userApis.GetAllMedia(),
    { enabled: user.isUserAuthenticated }
  );

  useEffect(() => {
    if (searchParams.get("tab") === null) {
      router.push("/watchlist?tab=watchlist");
    }
  }, []);

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
      <section className="flex gap-5 mt-5">
        <button
          onClick={() => {
            router.push("/watchlist?tab=watchlist");
          }}
          className={clsx(
            " px-2 text-sm py-1 cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-md",
            searchParams.get("tab") === "watchlist"
              ? "bg-_blue text-_sidenav_bg"
              : "bg-_genre_chip_bg"
          )}
        >
          Watchlist
        </button>
        <button
          onClick={() => {
            router.push("/watchlist?tab=history");
          }}
          className={clsx(
            " px-2 text-sm py-1 cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-md",
            searchParams.get("tab") === "history"
              ? "bg-_blue text-_sidenav_bg"
              : "bg-_genre_chip_bg"
          )}
        >
          History
        </button>
      </section>

      <section ref={parent}>
        {searchParams.get("tab") === "watchlist" ? (
          <>
            {data.watchlist.length > 0 &&
              data.watchlist.map((item: AddMediaResponse, index: number) => {
                return <MoviesList key={item.id} {...item} Index={index} />;
              })}
          </>
        ) : (
          <>
            {data.history.length > 0 &&
              data.history.map((item: AddMediaResponse, index: number) => {
                return <MoviesList key={item.id} {...item} Index={index} />;
              })}
          </>
        )}
      </section>
      <section>
        {data.watchlist.length === 0 || data.history.length === 0 ? (
          <div className=" w-full h-96 grid place-content-center ">
            <p className="text-xl text-neutral-500">
              {searchParams.get("tab") === "watchlist" &&
                data.watchlist.length === 0 &&
                "Your watchlist is empty."}
              {searchParams.get("tab") === "history" &&
                data.history.length === 0 &&
                "No history found."}
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Watchlist;
