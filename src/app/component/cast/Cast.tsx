"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import SingleCastCard from "./SingleCastCard";

const Cast = ({ data }: { data: castProps[] }) => {
  const castContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

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

  useEffect(() => {
    const container = castContainerRef.current;
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
    <div>
      <h3 className="text-_white text-2xl mb-3 font-medium pl-10">Cast</h3>
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
        <section
          ref={castContainerRef}
          className="overflow-x-auto Cast_card_Container card_container flex max-md:gap-5 gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap"
        >
          {data.map((item) => (
            <SingleCastCard key={item.id} {...item} />
          ))}
        </section>
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
    </div>
  );
};

export default Cast;
