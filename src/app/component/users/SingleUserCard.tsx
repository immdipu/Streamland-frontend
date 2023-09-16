import React from "react";
import Link from "next/link";
import { userList } from "@/types/userTypes";
import Image from "next/image";
import { Role } from "@/types/role";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";
import { OnlineUsersTypese } from "@/types/chatTypes";

const SingleUserCard: React.FC<OnlineUsersTypese> = ({
  _id,
  fullName,
  profilePic,
  username,
  role,
}) => {
  // const [follow, setFollow] = React.useState<boolean>(
  //   isFollowing ? isFollowing : false
  // );
  // const updateFollow = useMutation((id: string) => userApis.FollowUser(id), {
  //   onError: () => {
  //     toast.error("Failed to follow Try Again!");
  //   },
  // });

  return (
    <div className=" px-4 py-2  flex items-center hover:bg-neutral-900 transition-colors duration-200 ease-linear justify-between">
      <Link
        className="flex  w-full items-center  space-x-2"
        key={_id}
        href={`/profile/${username}`}
      >
        <div className="relative">
          <Image
            src={profilePic}
            alt={fullName}
            className="rounded-full"
            width={52}
            height={52}
          />
          <div className="bg-green-500 w-3 h-3 top-1 border right-0 rounded-full absolute" />
        </div>

        <div>
          <h1 className="font-Helvetica  items-center capitalize text-neutral-200 font-normal text-base">
            {fullName}{" "}
            {role === Role.admin && (
              <span className="border inline-block ml-5 border-_light_white rounded-full text-xs border-opacity-40 text-neutral-400 bg-neutral-800 px-2 py-[1px]">
                {role}
              </span>
            )}
          </h1>
          <h4 className="text-neutral-400 text-xs font-normal tracking-wide">
            @{username}
          </h4>
        </div>
      </Link>
      {/* <div>
        <button
          onClick={() => {
            updateFollow.mutate(_id);
            setFollow(!follow);
          }}
          className="text-xs text-neutral-400 font-normal border border-_welcometext_lightblue rounded-full px-2 py-1 hover:text-neutral-200"
        >
          {follow ? "Following" : "Follow"}
        </button>
      </div> */}
    </div>
  );
};

export default SingleUserCard;
