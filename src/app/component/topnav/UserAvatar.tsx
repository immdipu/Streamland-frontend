/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

const UserAvatar = () => {
  const user = useAppSelector((state) => state.auth);
  return (
    <div>
      <div className="bg-neutral-500 p-[2px] rounded-md">
        {user.profilePic && (
          <img
            className="w-10 h-10 rounded-md object-cover"
            src={user.profilePic}
            alt="user profile"
          />
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
