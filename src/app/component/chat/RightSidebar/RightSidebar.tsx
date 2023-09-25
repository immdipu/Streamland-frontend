/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { BiChevronDown } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import SingleMemberCard from "./SingleMemberCard";

const RightSidebar = ({ ChatId }: { ChatId: string }) => {
  const chat = useAppSelector((state) => state.chat);
  const [showMembers, setShowMembers] = React.useState(false);
  const { data, isLoading } = useQuery(["GetGroupDetails", ChatId], () =>
    userApis.getGroupDetails(ChatId)
  );

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (!data) {
    <div>Something went wrong</div>;
  }

  return (
    <div
      className={clsx(
        "  shrink-0  duration-300 overflow-hidden transition-all ease-in-out bg-neutral-800",
        chat.showRightSidebar ? "w-96" : "w-0 px-0"
      )}
    >
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="w-24 h-24 rounded-full border border-neutral-600 border-opacity-80 bg-neutral-700 p-3">
          <img
            src={`https://avatars.dicebear.com/api/bottts/${chat.currentActiveChat?.chatName}.svg`}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <h2 className="mt-4 font-medium text-neutral-200 text-xl px-6 text-center">
          {chat.currentActiveChat?.chatName}
        </h2>
      </div>
      <section>
        <h3 className="text-neutral-200 font-medium text-lg px-6 mt-10">
          About
        </h3>
        <p className="text-neutral-400 text-sm px-6 mt-1">
          {chat.currentActiveChat?.chatName} is a group chat
        </p>
      </section>
      <section className="bg-neutral-700 bg-opacity-40 py-2 mt-3 flex flex-col items-center">
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="flex  py-2 justify-between w-full px-6 "
        >
          Members{" "}
          <BiChevronDown
            className={clsx(
              "text-2xl duration-300 transition-all ease-linear",
              showMembers ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        <ul
          className={clsx(
            " w-full  transition-all flex flex-col gap-1 duration-150 ease-linear overflow-y-auto ",
            showMembers ? "max-h-72 py-3" : "h-0 py-0"
          )}
        >
          {data?.users
            .sort((userA, userB) => {
              if (userA._id === data.groupAdmin) return -1;
              if (userB._id === data.groupAdmin) return 1;
              return 0;
            })
            .map((item) => (
              <SingleMemberCard
                key={item._id}
                owner={data.groupAdmin}
                {...item}
              />
            ))}
        </ul>
      </section>
    </div>
  );
};

export default RightSidebar;
