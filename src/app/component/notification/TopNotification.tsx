"use client";
import React, { useState, useLayoutEffect } from "react";
import { MdClose } from "react-icons/md";

const TopNotification = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="z-20 py-2 backdrop-blur-md flex items-center w-full px-5 max-md:px-1 bg-_dark">
      <div className="w-full">
        🚀🎉Try out our new app! that lets you watch videos and listen to music
        with friends in real-time.
        <a
          href="https://mediasharing.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-semibold px-1"
        >
          Click here
        </a>{" "}
        to experience synchronized video watching and music listening with
        friends for free!:{" "}
        <a
          href="https://mediasharing.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-semibold px-2"
        >
          MediaSharing
        </a>
      </div>

      <button
        onClick={() => {
          setShow(false);
        }}
        className="ml-2 w-fit  text-white"
        title="Close"
      >
        <MdClose />
      </button>
    </div>
  );
};

export default TopNotification;
