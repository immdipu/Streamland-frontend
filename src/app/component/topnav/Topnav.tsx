"use client";
import React, { useContext, useEffect, useState } from "react";
import SearchStatic from "./SearchStatic";
import { useRouter } from "next/navigation";
import { BiArrowBack, BiMenuAltLeft } from "react-icons/bi";
import clsx from "clsx";
import { SearchContext } from "@/context/GlobalProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import UserAvatar from "./UserAvatar";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import SmallLoader from "../loader/SmallLoader";
import { LoggedIn } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Role } from "@/types/role";
import Notification from "../notification/Notification";
import TopNotification from "../notification/TopNotification";
import { useScroll, useMotionValueEvent } from "framer-motion";

const Topnav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const GlobalContext = useContext(SearchContext);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      document.querySelector(".topnav")?.classList.add("addblur");
    } else {
      document.querySelector(".topnav")?.classList.remove("addblur");
    }
  });

  const AutoLogin = useMutation(() => userApis.AutoLogin(), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
    },
    onError: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    AutoLogin.mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(
        " z-50 fixed bg-transparent  inset-x-0 h-20 top-0",
        pathname === "/chat" ? "pl-0" : "pl-56 max-md:pl-0"
      )}
    >
      {/* <TopNotification /> */}
      <section className="  h-full topnav flex  items-center w-full px-5 max-md:px-1">
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
          className={clsx("mr-5 hidden max-md:mr-2 max-md:block")}
          onClick={() =>
            GlobalContext?.setShowSidebar(!GlobalContext.showSider)
          }
        >
          <BiMenuAltLeft className="text-2xl  hover:text-_sidenav_bg duration-200 transition-colors ease-in-out text-_welcometext_lightblue" />
        </button>

        <SearchStatic />

        <section className=" w-full flex justify-end  mr-16 max-md:mr-1 ">
          <section className=" mr-10 max-md:mr-0 flex items-center">
            <Notification />
          </section>
          {AutoLogin.isLoading ? (
            <SmallLoader size={30} />
          ) : (
            <>
              {user.isUserAuthenticated ? (
                <UserAvatar />
              ) : (
                <Link
                  href={"/login"}
                  className={clsx(
                    "bg-_genre_chip_bg max-md:flex max-md:items-center max-md:text-xs max-md:py-1 max-md:px-2  py-2 bg-opacity-60 border border-neutral-500 hover:border-opacity-75 duration-200 transition-colors  ease-linear border-opacity-25 px-4 block rounded-md  text-sm tracking-wider text-neutral-200",
                    pathname === "/login" && "hidden"
                  )}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default Topnav;
