"use client";
import { userApis } from "@/app/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LoggedIn } from "@/redux/slice/authSlice";
import { toggelChatSidebar } from "@/redux/slice/chatSlice";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { BiHomeAlt2, BiSearch } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { LuArrowLeft } from "react-icons/lu";
import CustomModal from "../../modal/CustomModal";
import CreateGroupForm from "../groupchat/CreateGroupForm";
import GroupChat from "../groupchat/GroupChat";
import PersonalChat from "../personalChat/PersonalChat";

const ChatSidebar = () => {
  const chatType = useSearchParams().get("type");
  const user = useAppSelector((state) => state.auth);
  const chat = useAppSelector((state) => state.chat);
  const [currentChatType, setCurrentChatType] = React.useState<
    "global" | "personal"
  >(chatType === "personal" ? "personal" : "global");

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

  useEffect(() => {
    if (chatType === "personal") {
      setCurrentChatType("personal");
    } else {
      setCurrentChatType("global");
    }
  }, [chatType]);

  AutoLogin.isLoading && <div>Loading...</div>;

  const CreateAgroup = (
    <button className=" bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 rounded-sm ease-linear group shadow-md font-light text-sm py-1 px-4 w-full justify-center gap-2 flex items-center">
      <GoPlus className="text-neutral-400 group-hover:text-neutral-300" />{" "}
      <span className="text-neutral-400 group-hover:text-neutral-300">
        Create a new group
      </span>
    </button>
  );

  return (
    <div
      className={clsx(
        "fixed  left-0 bottom-0 z-[51] py-2 bg-neutral-900 transition-all ease-in-out duration-100  max-w-sm w-full max-md:w-3/4 max-md:shrink shrink-0 h-full",
        chat.showChatSidebar ? " max-md:left-0 " : "max-md:-left-96"
      )}
    >
      <div className="flex items-center gap-1">
        <button
          className="px-1  ml-2 max-md:block hidden"
          onClick={() => dispatch(toggelChatSidebar())}
        >
          <LuArrowLeft className="text-lg text-neutral-300" />
        </button>
        <div className="flex items-center h-10 bg-neutral-800 border border-neutral-600 border-opacity-30 px-2 rounded-full">
          <BiSearch className="text-neutral-400 text-xl" />
          <input
            type="search"
            placeholder="Search chat "
            className=" bg-transparent h-full px-3 text-neutral-300 placeholder:text-neutral-500 my-1 outline-none  border-none"
          />
        </div>
        <Link href={"/"}>
          <BiHomeAlt2 className="text-xl ml-2 text-neutral-400" />
        </Link>
      </div>
      {/* messages */}
      <section className=" mt-12 flex flex-col gap-2 chatlist-container overflow-hidden hover:overflow-y-auto  max-h-[82%]">
        <div>
          <div className="flex items-center justify-around gap-2 mb-5 border-b border-neutral-700 ">
            <div>
              <button
                className="pb-3 text-neutral-100"
                onClick={() => {
                  router.push("/chat?type=global");
                }}
              >
                Global chat
              </button>
              <div
                className={clsx(
                  "border-b-4 border-blue-600 rounded-xl transition-opacity duration-200 ease-linear",
                  currentChatType === "global" ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
            <div>
              <button
                className="pb-3 text-neutral-100"
                onClick={() => {
                  router.push("/chat?type=personal");
                }}
              >
                Personal chat
              </button>
              <div
                className={clsx(
                  "border-b-4 rounded-xl border-blue-600 transition-opacity duration-200 ease-linear",
                  currentChatType === "personal" ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>
        </div>
        {currentChatType === "global" && (
          <div className="px-10 flex justify-center mb-5 ">
            <CustomModal
              buttonElement={CreateAgroup}
              data={<CreateGroupForm />}
              width={"20rem"}
            />
          </div>
        )}
        <section>
          {currentChatType === "global" ? <GroupChat /> : <PersonalChat />}
        </section>
      </section>
    </div>
  );
};

export default ChatSidebar;
