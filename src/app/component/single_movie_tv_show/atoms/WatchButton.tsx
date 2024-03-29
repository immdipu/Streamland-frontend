import React from "react";
import Link from "next/link";

interface WatchButtonProps {
  TYPE: string;
  id: string;
}

const WatchButton: React.FC<WatchButtonProps> = ({ TYPE, id }) => {
  return (
    <div className=" mr-24 max-md:mr-0 max-xl:mr-6  max-md:mt-6 max-md:flex max-md:justify-center pt-3">
      {TYPE === "MOVIE" && (
        <Link
          href={`/player/movie/${id}`}
          className="text-_white  px-6 text-base tracking-wider py-2 rounded-lg bg-blue-600"
        >
          Watch
        </Link>
      )}
      {TYPE === "TV" && (
        <Link
          href={`/tv/${id}/seasons`}
          className="text-_white  px-6 text-base tracking-wider py-2 rounded-lg bg-blue-600"
        >
          Seasons
        </Link>
      )}
    </div>
  );
};

export default WatchButton;
