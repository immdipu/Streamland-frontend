"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { LuArrowLeft } from "react-icons/lu";
import { toggelChatSidebar } from "@/redux/slice/chatSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toggelRightSidebar } from "@/redux/slice/chatSlice";

interface MessageHeaderProps {
  fullName: string;
  profilePic: string;
  isGroupChat: boolean;
  id: string | null;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  fullName,
  profilePic,
  id,
  isGroupChat = false,
}) => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);

  let userExist;
  if (id) {
    userExist = chat.OnlineUsers.find((user) => user._id === id);
  }

  return (
    <div className="bg-neutral-900 w-full h-16  flex items-center px-5 max-md:pl-2">
      <button
        className="px-3 max-md:block hidden "
        onClick={() => dispatch(toggelChatSidebar())}
      >
        <LuArrowLeft className="text-lg text-neutral-300" />
      </button>
      <div className="shrink-0 grid place-content-center h-12 w-12 rounded-full  ">
        <Image
          src={profilePic || "https://i.imgur.com/phEO72D.png"}
          alt="profile"
          width={50}
          height={50}
        />
      </div>
      <div className="ml-4">
        <h3 className="text-neutral-200 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {fullName}
        </h3>
        {id && (
          <p className="font-normal text-xs text-neutral-400 whitespace-nowrap">
            {userExist ? "Online" : "Offline"}
          </p>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(toggelRightSidebar())}
            className="p-2 rounded-full border-neutral-700 bg-neutral-800 active:scale-75 transition-transform duration-150 ease-linear border  "
          >
            <BsThreeDotsVertical className="text-lg text-neutral-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
