import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface MiniCarouselProps {
  item: getTrendingListResponse;
  selected: boolean;
}

const MiniCarousel: React.FC<MiniCarouselProps> = ({ item, selected }) => {
  return (
    <div className={clsx("w-full  px-3 ")}>
      <Image
        src={`https://image.tmdb.org/t/p/w400/${item.backdrop_path!}`}
        width={400}
        height={400}
        priority
        alt={(item.title || item.original_title) ?? "poster"}
        style={{ objectFit: "cover", height: "100%", width: "100%" }}
        className={clsx(
          "rounded-xl select-none will-change-transform duration-300 transition-transform ease-linear",
          selected ? "scale-100" : "scale-75"
        )}
      />
    </div>
  );
};

export default MiniCarousel;
