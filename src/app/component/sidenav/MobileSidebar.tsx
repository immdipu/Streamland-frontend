"use client";
import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";
import DesktopSidebar from "./DesktopSidebar";
import clsx from "clsx";

const MobileSidebar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className={clsx(
          "z-50 fixed w-56 first-letter duration-100 ease-in-out transition-all",
          show ? "left-0" : "-left-60"
        )}
      >
        <DesktopSidebar />
      </div>
      <div className="h-16 z-50 fixed items-center px-3 inset-x-0  bottom-0 hidden max-md:flex justify-between bg-_black_bg bg-opacity-30 backdrop-blur-md">
        <div></div>
        <button className=" pr-3" onClick={() => setShow(!show)}>
          <BiCategory className="text-3xl text-_light_white" />
        </button>
      </div>
    </>
  );
};

export default MobileSidebar;
