"use client";
import React, { use, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import SingleUserCard from "./SingleUserCard";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/role";
const CustomModal = dynamic(() => import("@/app/component/modal/CustomModal"));
const AllUsers = dynamic(() => import("./AllUsers"));

const Users = () => {
  const user = useAppSelector((state) => state.auth);
  const chat = useAppSelector((state) => state.chat);
  const { data, isLoading, error } = useQuery(
    ["getAllUsers", user.isUserAuthenticated],
    () => userApis.getUserList(1, "newest")
  );

  if (!user.isUserAuthenticated) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  const btn = (
    <button className="my-2 text-sm hover:text-neutral-100 transition-colors duration-200 ease-linear text-neutral-300">
      See More
    </button>
  );

  return (
    <div className="border slide-in-right border-_light_white border-opacity-30 max-lg:w-full max-lg:h-72 w-96 rounded-3xl overflow-hidden  bg-neutral-800 bg-opacity-95 userlist flex flex-col shrink-0  overflow-y-scroll ">
      <>
        <h3 className="ml-5 pt-3 pb-2">Online users</h3>
      </>
      {chat.OnlineUsers.length > 0 &&
        [...chat.OnlineUsers]
          .sort((a, b) => {
            if (a.role === "admin") return -1;
            return 0;
          })
          .map((item) => {
            // if (item._id === user.id && item.role !== Role.admin) return null;
            return <SingleUserCard key={item._id} {...item} />;
          })}
      <>
        {user.role === Role.admin && (
          <div className="absolute bottom-0 flex justify-center right-0 left-0">
            <CustomModal
              buttonElement={btn}
              data={
                <>
                  <AllUsers />
                </>
              }
              width={"1/2"}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default Users;
