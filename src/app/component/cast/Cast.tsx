"use client";
import React, { useState, useRef } from "react";
import { castProps } from "@/types/types";
import SingleCastCard from "./SingleCastCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Cast = ({ data }: { data: castProps[] }) => {
  const castContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleLeftScrollClick = () => {
    const container = document.querySelector(".Cast_card_Container");
    container?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };
  const handleRightScrollClick = () => {
    const container = document.querySelector(".Cast_card_Container");
    container?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <h3 className="text-_white text-2xl mb-3 font-medium pl-10">Cast</h3>
      <div className="flex items-center">
        {showLeftButton && (
          <div
            className="border-[0.4px] border-_light_white mb-14 rounded-sm border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch mr-3 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
            onClick={handleLeftScrollClick}
          >
            <MdKeyboardArrowLeft className="text-2xl text-_light_white" />
          </div>
        )}
        <section
          ref={castContainerRef}
          className="overflow-x-auto Cast_card_Container flex gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap"
        >
          {data.map((item) => (
            <SingleCastCard key={item.id} {...item} />
          ))}
        </section>
        {showRightButton && (
          <div
            onClick={handleRightScrollClick}
            className="border-[0.4px] border-_light_white mb-14 rounded-sm border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch ml-3 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
          >
            <MdKeyboardArrowRight className="text-2xl text-_light_white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cast;
