"use client";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import SingleCard from "./SingleCard";
import SingleTvCard from "./SingleTvCard";

interface dataProps {
  data: NowPlayingResponse[];
  className: string;
  type: "MOVIE" | "TV";
}

const Slider: React.FC<dataProps> = ({ data, className, type }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

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

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        let clientScrollLeft = container.scrollLeft + container.clientWidth;
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(clientScrollLeft >= container.scrollWidth);
      };

      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="flex items-center">
      <div
        className={clsx(
          "border-[0.4px] border-_light_white rounded-sm mb-14 border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch mr-3 max-md:mr-0 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center",
          showLeftButton
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={handleLeftScrollClick}
      >
        <MdKeyboardArrowLeft className="text-2xl text-_light_white" />
      </div>

      <div
        ref={containerRef}
        className={
          "overflow-x-auto card_container flex max-md:gap-5 gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap " +
          `${className}`
        }
      >
        {type === "MOVIE" &&
          data.map((item) => <SingleCard {...item} key={item.id} />)}

        {type === "TV" &&
          data.map((item) => <SingleTvCard {...item} key={item.id} />)}
      </div>

      <div
        onClick={handleRightScrollClick}
        className={clsx(
          "border-[0.4px] border-_light_white mb-14 rounded-sm border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch ml-3 max-md:ml-0 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center",
          showRightButton
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
      >
        <MdKeyboardArrowRight className="text-2xl text-_light_white" />
      </div>
    </div>
  );
};

export default Slider;
