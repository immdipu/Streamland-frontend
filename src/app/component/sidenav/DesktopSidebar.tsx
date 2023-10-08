/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Component from "./sidebar_component/Sidebarcomponent";

import Feeback from "./sidebar_component/Feeback";

import Link from "next/link";

const DesktopSidebar = () => {
  return (
    <div className="w-56 border-r-[0.2px] border-r-_light_white border-opacity-10 bg-_black_bg fixed inset-y-0">
      <Component />
      <div className=" absolute left-0 right-0 bottom-8 text-center">
        <Link
          href={"/supporter"}
          className="text-sm   text-blue-600 font-medium opacity-80 hover:underline"
        >
          Become a supporter
        </Link>
      </div>
      <div className=" absolute bottom-0  ">
        <Feeback />
      </div>
    </div>
  );
};

export default DesktopSidebar;
