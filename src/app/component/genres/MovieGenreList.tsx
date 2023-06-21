"use client";
import React, { useState } from "react";
import { genres } from "@/utils/genreData";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const MovieGenreList = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(genreId ?? "28");
  const handleTabClick = (index: number) => {
    setActiveTab(index.toString());
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-3 pl-16 mt-6">
        {genres.map((item) => {
          return (
            <Link
              href={`movie/genre/?tab=${item.id}`}
              key={item.id}
              className={clsx(
                " px-2 text-sm py-1 cursor-pointer hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                activeTab === item.id.toString()
                  ? "bg-_blue text-_sidenav_bg"
                  : "bg-_sidenav_bg"
              )}
              onClick={() => {
                handleTabClick(item.id);
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieGenreList;
