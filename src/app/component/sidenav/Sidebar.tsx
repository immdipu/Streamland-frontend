import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const Sidebar = () => {
  return (
    <div className="">
      <div className="max-md:hidden">
        <DesktopSidebar />
      </div>
      <MobileSidebar />
    </div>
  );
};

export default Sidebar;
