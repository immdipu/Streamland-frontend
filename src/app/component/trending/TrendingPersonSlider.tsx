"use client";
import { SingleTrendingPersonProp } from "@/types/personTypes";
import React, { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TrendingPersonCard from "./TrendingPersonCard";

interface TrendingPersonSliderProps {
  data: SingleTrendingPersonProp[];
  className: string;
}

const TrendingPersonSilder: React.FC<TrendingPersonSliderProps> = ({
  data,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleLeftScrollClick = () => {
    const container = document.querySelector(`.${className}`);
    container?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const handleRightScrollClick = () => {
    const container = document.querySelector(`.${className}`);
    container?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center">
      {showLeftButton && (
        <div
          className="border-[0.4px] border-_light_white rounded-sm mb-14 border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch mr-3 max-md:mr-0 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
          onClick={handleLeftScrollClick}
        >
          <MdKeyboardArrowLeft className="text-2xl text-_light_white" />
        </div>
      )}
      <div
        ref={containerRef}
        className={
          "overflow-x-auto card_container max-md:gap-3 flex gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap " +
          `${className}`
        }
      >
        {data.map((item) => {
          return <TrendingPersonCard key={item.id} {...item} />;
        })}
      </div>
      {showRightButton && (
        <div
          onClick={handleRightScrollClick}
          className="border-[0.4px] border-_light_white mb-14 rounded-sm border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch ml-3 max-md:ml-0 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
        >
          <MdKeyboardArrowRight className="text-2xl text-_light_white" />
        </div>
      )}
    </div>
  );
};

export default TrendingPersonSilder;
