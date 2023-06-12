"use client";
import React, { useEffect, useState, useRef } from "react";
import { NowPlayingResponse } from "@/types/types";
import SingleCard from "./SingleCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


interface dataProps {
  data: NowPlayingResponse[];
}

const Slider: React.FC<dataProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleLeftScrollClick = () => {
    const container = document.querySelector(".Card_Container");
    container?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };
  const handleRightScrollClick = () => {
    const container = document.querySelector(".Card_Container");
    container?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };



  return (
    <div className="flex items-center">
      {showLeftButton && (
        <div
          className="border-[0.4px] border-_light_white rounded-sm mb-14 border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch mr-3 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
          onClick={handleLeftScrollClick}
        >
          <MdKeyboardArrowLeft className="text-2xl text-_light_white" />
        </div>
      )}
      <div
        ref={containerRef}
        className="Card_Container overflow-x-auto flex gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap"
      >
        {data.map((item) => (
          <SingleCard {...item} key={item.id} />
        ))}
      </div>
      {showRightButton && (
        <div
          onClick={handleRightScrollClick}
          className="border-[0.4px] border-_light_white mb-14 rounded-sm border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch ml-3 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
        >
          <MdKeyboardArrowRight className="text-2xl text-_light_white" />
        </div>
      )}
    </div>
  );
};

export default Slider;
