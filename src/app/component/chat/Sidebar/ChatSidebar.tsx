"use client";
import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import SingleUserCard from "./SingleUserCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import { useAppSelector } from "@/redux/hooks";
import { LoggedIn } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const ChatSidebar = () => {
  const user = useAppSelector((state) => state.auth);
  const { data, isLoading } = useQuery(
    ["getAllChats", user.isUserAuthenticated],
    () => userApis.getUserChatList()
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const AutoLogin = useMutation(() => userApis.AutoLogin(), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
    },
    onError: () => {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (!user.isUserAuthenticated) {
      AutoLogin.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-400"></div>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <h1 className="text-2xl text-neutral-400">No chat found</h1>
      </div>
    );
  }

  return (
    <div
      className="
  fixed  left-0 bottom-0 z-[51] py-2 bg-neutral-900  max-w-sm w-full shrink-0 h-full
  "
    >
      <div className="flex items-center gap-4">
        <RxHamburgerMenu className="text-2xl text-neutral-400" />
        <div className="flex items-center h-10 bg-neutral-800 border border-neutral-600 border-opacity-30 px-3 rounded-full">
          <BiSearch className="text-neutral-400 text-xl" />
          <input
            type="search"
            placeholder="Search chat "
            className=" bg-transparent h-full px-3 text-neutral-300 placeholder:text-neutral-500 my-1 outline-none  border-none"
          />
        </div>
      </div>
      {/* messages */}
      <section className=" mt-20 flex flex-col gap-2 chatlist-container overflow-hidden hover:overflow-y-auto  max-h-[82%]">
        <h2 className="px-6 font-semibold text-xl">Chats</h2>
        {data?.map((chat) => {
          return <SingleUserCard key={chat._id} {...chat} />;
        })}
      </section>
    </div>
  );
};

export default ChatSidebar;
