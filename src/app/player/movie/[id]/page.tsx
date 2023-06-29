"use client";
import React, { useState } from "react";
const Page = ({ params }: any) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const HanldeClick = () => {
    localStorage.setItem("movieId", params.id);
    setShowOverlay(false);
  };
  return (
    <>
      <div className="h-[80vh] pt-24 relative">
        {showOverlay && (
          <div
            className="absolute inset-0 bg-black opacity-0"
            onClick={HanldeClick}
          ></div>
        )}
        <iframe
          src={`https://autoembed.to/movie/tmdb/${params.id}`}
          width="100%"
          height="100%"
          allowFullScreen
          className="full"
        />
      </div>
    </>
  );
};

export default Page;
