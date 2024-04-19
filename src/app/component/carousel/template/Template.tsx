import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsVolumeMuteFill } from "react-icons/bs";
import AddToWatchlist from "../../Buttons/AddToWatchlist";
import Details from "../organism/Details";
const TrailerPlayer = dynamic(() => import("./TrailerPlayer"));

const Template = ({ item }: { item: getTrendingListResponse }) => {
  const [loadTrailer, setLoadTrailer] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
      key={item.id}
      style={{ overflow: showTrailer ? "visible" : "hidden" }}
      className="h-full  relative w-full  "
    >
      {!loadTrailer && (
        <Image
          src={`https://image.tmdb.org/t/p/original/${item.backdrop_path!}`}
          width={500}
          height={500}
          priority
          alt={(item.title || item.original_title) ?? "poster"}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      )}
      <TrailerPlayer
        name={item.name}
        original_title={item.original_title}
        setLoadTrailer={setLoadTrailer}
        loadTrailer={loadTrailer}
        showTrailer={showTrailer}
        setShowTrailer={setShowTrailer}
      />
      <section className="absolute  flex flex-col pl-10 justify-between inset-0 bg-gradient-to-r from-_black_bg   p-6">
        <Details item={item} />
        <div className="mb-5 flex gap-5 ">
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

          {loadTrailer && (
            <button
              title="Play with sound"
              onClick={() => {
                setShowTrailer(!showTrailer);
              }}
            >
              <BsVolumeMuteFill className="text-2xl opacity-40 hover:opacity-100 duration-300 text-_white" />
            </button>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Template;
