import React from "react";
import { genresProps } from "@/types/types";
import Link from "next/link";

const Genres = ({ data }: { data: genresProps[] }) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            className="text-_welcometext_lightblue whitespace-nowrap bg-_genre_chip_bg shadow-sm  px-2 py-1 rounded-md font-normal tracking-wide hover:text-_white duration-300 transition-colors ease-linear text-xs"
            href={`movie/genre?tab=${item.id}`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Genres;
