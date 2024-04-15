import React, { useEffect, useState } from "react";
import { userApis } from "@/app/userApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

const TrailerPlayer = ({
  name,
  original_title,
  setLoadTrailer,
  loadTrailer,
  showTrailer,
  setShowTrailer,
}: any) => {
  const searchTerm = name || original_title || "";
  const [show, setShow] = useState(true);

  const { data, isLoading } = useQuery(
    ["getTrailer", name, original_title],
    () => userApis.GetTrailer(searchTerm + " trailer")
  );

  useEffect(() => {
    function timeout() {
      if (data && show) {
        setLoadTrailer(true);
      }
    }
    const mtime = setTimeout(timeout, 5000);
    return () => clearTimeout(mtime);
  }, [data, show]);

  if (!data || !show) return null;

  return (
    <div
      className={clsx(
        "w-full  h-full group relative duration-300 transition-all ease-in-out",
        loadTrailer ? "block" : "hidden",
        showTrailer ? "z-[55] scale-100 h-screen" : "z-0 scale-[1.35] h-inherit"
      )}
    >
      <iframe
        className="w-full h-full object-cover  "
        src={`https://www.youtube.com/embed/${
          data[0].id
        }?controls=${1}&autoplay=1&mute=1&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <button
        onClick={() => {
          setLoadTrailer(false);
          setShowTrailer(false);
          setShow(false);
        }}
        className="absolute grid place-content-center p-5 bg-neutral-800  max-md:opacity-100 opacity-0 -top-4 group-hover:top-5 duration-100 transition-all ease-linear   group-hover:opacity-100  text-white w-5 h-5 right-1/2 max-md:top-5 z-[60] rounded-full"
      >
        <span>X</span>
      </button>
    </div>
  );
};

export default TrailerPlayer;
