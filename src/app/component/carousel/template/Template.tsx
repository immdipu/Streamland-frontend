import React, { useState, useEffect } from "react";
import Details from "../organism/Details";
import { getTrendingListResponse } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import AddToWatchlist from "../../Buttons/AddToWatchlist";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";

const Template = ({ item }: { item: getTrendingListResponse }) => {
  const searchTerm = item.name || item.original_title || "";
  const { data, isLoading } = useQuery(
    ["getTrailer", item.name, item.original_title],
    () => userApis.GetTrailer(searchTerm + " trailer")
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
      key={item.id}
      className="h-full  relative w-full "
    >
      {(isLoading || !data) && (
        <Image
          src={`https://image.tmdb.org/t/p/original/${item.backdrop_path!}`}
          width={500}
          height={500}
          priority
          alt={(item.title || item.original_title) ?? "poster"}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      )}
      <div className="w-full scale-[1.35] h-full border relative">
        {!isLoading && data && data.length > 0 && (
          <iframe
            className="w-full h-full object-cover  "
            src={`https://www.youtube.com/embed/${data[0].id}?controls=0&autoplay=1&mute=1&loop=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <section className="absolute  flex flex-col pl-10 justify-between inset-0 bg-gradient-to-r from-_black_bg   p-6">
        <Details item={item} />
        <div className="mb-5 flex gap-5">
          <Link
            href={`${item.media_type === "movie" ? "movie" : ""}${
              item.media_type === "tv" ? "tv" : ""
            }/${item.id}`}
            prefetch={false}
            className="bg-blue-500 rounded-md bg-opacity-20 backdrop:blur-sm  hover:opacity-75 transition-opacity duration-300 ease-linear block text-white  py-3 px-5 font-medium font-Inter text-sm w-fit"
          >
            Watch Now
          </Link>
          <AddToWatchlist {...item} showAddToWatchlist={true} />
        </div>
      </section>
    </motion.div>
  );
};

export default Template;
