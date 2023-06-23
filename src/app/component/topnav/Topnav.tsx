"use client";
import React from "react";
import SearchStatic from "./SearchStatic";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Topnav = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className="pl-56  z-50 fixed bg-transparent
     inset-x-0 h-20 top-0"
    >
      <section className="backdrop-blur-md h-full flex items-center w-full px-5">
        <button
          onClick={() => {
            router.back();
          }}
          className={clsx(
            "mr-5",
            pathname === "/"
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          )}
        >
          <BiArrowBack className="text-2xl hover:text-_sidenav_bg duration-200 transition-colors ease-in-out text-_welcometext_lightblue" />
        </button>
        <SearchStatic />
      </section>
    </div>
  );
};

export default Topnav;
