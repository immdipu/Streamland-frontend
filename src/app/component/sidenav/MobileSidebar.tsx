"use client";
import { SearchContext } from "@/context/GlobalProvider";
import clsx from "clsx";
import { useContext } from "react";
import DesktopSidebar from "./DesktopSidebar";

const MobileSidebar = () => {
  const GlobalContext = useContext(SearchContext);

  return (
    <>
      <div
        className={clsx(
          "z-[52] fixed w-56 first-letter duration-100 ease-in-out transition-all",
          GlobalContext?.showSider ? "left-0" : "-left-60"
        )}
      >
        <DesktopSidebar />
      </div>
      {GlobalContext?.showSider && (
        <div
          onClick={() =>
            GlobalContext?.setShowSidebar(!GlobalContext.showSider)
          }
          className="inset-0 w-full h-full z-[51] fixed items-center px-3  hidden max-md:flex justify-between bg-_black_bg bg-opacity-50"
        />
      )}
    </>
  );
};

export default MobileSidebar;
