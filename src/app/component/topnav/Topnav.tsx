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
import { useSocket } from "@/context/SocketProvider";

const Topnav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const GlobalContext = useContext(SearchContext);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isOnline } = useSocket();

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
        <div>
          <span
            className={clsx(
              "text-xs block  font-semibold ",
              isOnline ? "text-green-500" : "text-red-500"
            )}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        <section className=" w-full flex justify-end mr-16 ">
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
                    "bg-_genre_chip_bg  py-2 bg-opacity-60 border border-neutral-500 hover:border-opacity-75 duration-200 transition-colors  ease-linear border-opacity-25 px-4 block rounded-md  text-sm tracking-wider text-neutral-200",
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
