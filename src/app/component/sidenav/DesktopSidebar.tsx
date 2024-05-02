/* eslint-disable @next/next/no-img-element */
"use client";
import Component from "./sidebar_component/Sidebarcomponent";

import Feeback from "./sidebar_component/Feeback";

const DesktopSidebar = () => {
  return (
    <div className="w-56 border-r-[0.2px] border-r-_light_white border-opacity-10 bg-_black_bg fixed inset-y-0">
      <Component />
      <div className=" absolute bottom-0  ">
        <Feeback />
      </div>
    </div>
  );
};

export default DesktopSidebar;
