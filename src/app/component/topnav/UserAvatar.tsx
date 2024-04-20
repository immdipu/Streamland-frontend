/* eslint-disable @next/next/no-img-element */
"use client";
import { useSocket } from "@/context/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LoggedOut } from "@/redux/slice/authSlice";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsPersonSquare } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";

const UserAvatar = () => {
  const user = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const avatarREf = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLElement>(null);
  const avatarPicREf = useRef<HTMLImageElement>(null);
  const { isOnline } = useSocket();

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (
        e.target !== avatarREf.current &&
        e.target !== modal.current &&
        e.target !== avatarPicREf.current
      ) {
        setShowModal(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showModal]);

  return (
    <div className="relative">
      <div
        ref={avatarREf}
        onClick={() => setShowModal(!showModal)}
        className="bg-neutral-500 rounded-full cursor-pointer relative p-[2px] "
      >
        {user.profilePic && (
          <img
            ref={avatarPicREf}
            className="w-10 h-10 rounded-full object-cover"
            src={user.profilePic}
            alt="user profile"
          />
        )}
        <span
          className={clsx(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-neutral-800 bg-green-500"
          )}
        >
          {isOnline && " "}
        </span>
      </div>
      <section
        ref={modal}
        className={clsx(
          "absolute duration-150 ease-in-out transition-all overflow-hidden select-none w-40 right-0 bottom-0 0 top-12 rounded-md  bg-neutral-800  ",
          showModal ? "h-40 py-2" : "h-0 py-0"
        )}
      >
        <ul className="flex flex-col gap-1">
          <li className="flex justify-center items-center gap-5 transition-colors duration-200 ease-linear px-4 py-2">
            <span className="text-sm font-light text-center text-neutral-200">
              {user.fullName}
            </span>
          </li>

          <Link
            href={`/profile/${user.username}`}
            className="flex  items-center gap-5 hover:bg-black transition-colors duration-200 ease-linear  px-4 py-2"
          >
            <BsPersonSquare className="text-neutral-400 text-xl" />
            <span className="text-sm text-neutral-300">Account</span>
          </Link>
          <li
            onClick={() => {
              dispatch(LoggedOut());
            }}
            className="flex items-center gap-5 hover:bg-black transition-colors duration-200 ease-linear cursor-pointer px-4 py-2"
          >
            <IoLogOut className="text-neutral-400 text-2xl" />
            <span className="text-sm text-neutral-300">Log out</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UserAvatar;
