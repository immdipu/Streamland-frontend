import { WatchCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const WatchCard: FC<WatchCardProps> = ({ backdrop_path, id, title, type }) => {
  let link = type === "movie" ? `/player/movie/${id}` : `/tv/${id}/seasons`;
  return (
    <div className="w-72 flex flex-col max-md:w-52 shrink-0 relative slide-in-top group ">
      <Link
        href={link}
        prefetch={false}
        className="h-full border overflow-hidden border-neutral-600 rounded-2xl"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w400/${backdrop_path}`}
          width={300}
          height={300}
          alt={title || "Movie poster"}
          className=" w-full h-full object-cover rounded-2xl group-hover:scale-110 duration-200 transition-transform ease-linear"
        />
      </Link>
      <h3 className="text-base pl-1 mt-1 max-md:text-xs py-2 whitespace-nowrap line-clamp-1  overflow-hidden text-ellipsis font-medium  text-white">
        {title}
      </h3>
    </div>
  );
};

export default WatchCard;
