import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

interface RatingProps {
  rating: number | undefined;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="inline-flex  items-center  ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-[2px] before:rounded-full before:h-[2px]  leading-none text-xs text-_light_white">
      <MdOutlineStarPurple500 className="text-yellow-400 text-lg mr-1" />
      <p className="text-_light_white  font-Inter mt-1 text-smm">
        {Number(rating?.toFixed(1))}
      </p>
    </div>
  );
};

export default Rating;
