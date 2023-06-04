import React from "react";
import DesktopSidebar from "./DesktopSidebar";

const Sidebar = () => {
  return (
    <div className="max-md:hidden">
      <DesktopSidebar />
    </div>
  );
};

export default Sidebar;
