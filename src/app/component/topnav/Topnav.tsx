"use client";
import React, { useContext } from "react";
import SearchStatic from "./SearchStatic";
import { useRouter } from "next/navigation";
import { BiArrowBack, BiMenuAltLeft } from "react-icons/bi";
import clsx from "clsx";
import { SearchContext } from "@/context/GlobalProvider";

import { usePathname } from "next/navigation";

const Topnav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const GlobalContext = useContext(SearchContext);
  return (
    <div
      className="pl-56 max-md:pl-0 z-50 fixed bg-transparent
     inset-x-0 h-20 top-0"
    >
      <section className="backdrop-blur-md  h-full flex items-center w-full px-5">
        <button
          onClick={() => {
            router.back();
          }}
          className={clsx(
            "mr-5 max-md:hidden",
            pathname === "/"
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          )}
        >
          <BiArrowBack className="text-2xl hover:text-_sidenav_bg duration-200 transition-colors ease-in-out text-_welcometext_lightblue" />
        </button>

        <button
          className={clsx("mr-5 hidden max-md:block")}
          onClick={() =>
            GlobalContext?.setShowSidebar(!GlobalContext.showSider)
          }
        >
          <BiMenuAltLeft className="text-2xl  hover:text-_sidenav_bg duration-200 transition-colors ease-in-out text-_welcometext_lightblue" />
        </button>

        <SearchStatic />
        <section className=" w-full flex justify-end mr-16 hidden">
          <button className="bg-_genre_chip_bg py-2 bg-opacity-60 border border-neutral-500 hover:border-opacity-75 duration-200 transition-colors  ease-linear border-opacity-25 px-4 block rounded-md  text-sm tracking-wider text-neutral-200">
            Login
          </button>
        </section>
      </section>
    </div>
  );
};

export default Topnav;
