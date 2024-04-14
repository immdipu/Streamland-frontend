import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface GenreChipTypes {
  activeTab: string;
  title: string;
  tab: string | number;
  genre: "MOVIE" | "TV";
}

const GenreChip: React.FC<GenreChipTypes> = ({
  activeTab,
  title,
  tab,
  genre,
}) => {
  return (
    <Link
      href={`/${genre.toLowerCase()}/genre/?tab=${tab}`}
      className={clsx(
        " px-2 text-[13px] py-1 cursor-pointer border border-neutral-700 max-md:text-xs border-opacity-70 hover:border-opacity-100 hover:border-neutral-600 hover:bg-opacity-70 duration-200 transition-all ease-linear hover:shadow-lg rounded-md  ",
        activeTab === tab.toString()
          ? "bg-_blue text-_sidenav_bg border-transparent"
          : "bg-neutral-800 text-_white"
      )}
    >
      {title}
    </Link>
  );
};

export default GenreChip;
