import React from "react";
import Component from "./sidebar_component/Sidebarcomponent";
import Notifications from "./sidebar_component/Notifications";
import data from "@/utils/NotficationsMsg.json";
import Feeback from "./sidebar_component/Feeback";

const DesktopSidebar = () => {
  return (
    <div className="w-56 border-r-[0.2px] border-r-_light_white border-opacity-10 bg-_black_bg fixed inset-y-0">
      <Component />
      {data.length > 0 && <Notifications />}
      <div className=" absolute bottom-0 ">
        <Feeback />
      </div>
    </div>
  );
};

export default DesktopSidebar;
