import React from "react";
import Details from "../organism/Details";
import { getTrendingListResponse } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import AddToWatchlist from "../../Buttons/AddToWatchlist";

const Template = ({ item }: { item: getTrendingListResponse }) => {
  return (
    <div key={item.id} className="h-full  relative">
      {item.id.toString() !== "106379" && (
        <Image
          src={`https://image.tmdb.org/t/p/original/${item.backdrop_path!}`}
          width={500}
          height={500}
          priority
          alt={(item.title || item.original_title) ?? "poster"}
          style={{ objectFit: "cover", height: "100%" }}
        />
      )}
      <div className="w-full h-full border">
        {item.id.toString() === "106379" && (
          <iframe
            className="w-full h-full object-cover scale-150 "
            src="https://www.youtube.com/embed/V-mugKDQDlg?si=c0-slokEPD-kIk1X&amp;controls=0 &amp;autoplay=1&amp;mute=1&amp;loop=1&amp;"
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
    </div>
  );
};

export default Template;
