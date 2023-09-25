"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import { userApis } from "@/app/userApi";
import SingleUserCard from "../Sidebar/SingleUserCard";

const PersonalChat = () => {
  const user = useAppSelector((state) => state.auth);
  const { data, isLoading } = useQuery(
    ["getAllChats", user.isUserAuthenticated],
    () => userApis.getUserChatList(),
    { enabled: user.isUserAuthenticated }
  );

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <h1 className="text-2xl text-neutral-400">No chat found</h1>
      </div>
    );
  }
  return (
    <>
      {data?.map((chat) => {
        return <SingleUserCard key={chat._id} {...chat} />;
      })}
    </>
  );
};

export default PersonalChat;
