import React from "react";
import Link from "next/link";

interface genresProps {
  id: number;
  name: string;
  Type: "MOVIE" | "TV";
}

const GenresChip: React.FC<genresProps> = ({ Type, id, name }) => {
  return (
    <Link
      className="text-_welcometext_lightblue whitespace-nowrap border border-neutral-700 bg-_genre_chip_bg shadow-sm  px-2 py-[2px] rounded-[5px] font-normal tracking-wide hover:text-_white duration-300 transition-colors ease-linear text-smm"
      href={`/${Type.toLowerCase()}/genre?tab=${id}`}
    >
      {name}
    </Link>
  );
};

export default GenresChip;
