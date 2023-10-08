"use client";
import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  return path === "/chat" ? null : (
    <div className="">
      <div className="max-md:hidden">
        <DesktopSidebar />
      </div>
      <MobileSidebar />
    </div>
  );
};

export default Sidebar;
