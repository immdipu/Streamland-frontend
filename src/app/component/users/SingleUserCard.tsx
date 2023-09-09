import React from "react";
import Link from "next/link";
import { userList } from "@/types/userTypes";
import Image from "next/image";
import { Role } from "@/types/role";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";

const SingleUserCard: React.FC<userList> = ({
  _id,
  fullName,
  profilePic,
  username,
  role,
  isFollowing,
}) => {
  const [follow, setFollow] = React.useState<boolean>(
    isFollowing ? isFollowing : false
  );
  const updateFollow = useMutation((id: string) => userApis.FollowUser(id), {
    onError: () => {
      toast.error("Failed to follow Try Again!");
    },
  });

  return (
    <div className=" px-4 py-2  flex items-center hover:bg-neutral-900 transition-colors duration-200 ease-linear justify-between">
      <Link
        className="flex items-center space-x-2"
        key={_id}
        href={`/profile/${username}`}
      >
        <Image
          src={profilePic}
          alt={fullName}
          className="rounded-full"
          width={52}
          height={52}
        />
        <div>
          <h1 className="font-Helvetica capitalize text-neutral-200 font-normal text-base">
            {fullName}{" "}
            {role === Role.admin && (
              <span className="border border-_light_white rounded-full text-xs border-opacity-40 text-neutral-400 bg-neutral-800 px-2 py-1">
                {role}
              </span>
            )}
          </h1>
          <h4 className="text-neutral-400 text-xs font-normal tracking-wide">
            @{username}
          </h4>
        </div>
      </Link>
      <div>
        <button
          onClick={() => {
            updateFollow.mutate(_id);
            setFollow(!follow);
          }}
          className="text-xs text-neutral-400 font-normal border border-_welcometext_lightblue rounded-full px-2 py-1 hover:text-neutral-200"
        >
          {follow ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default SingleUserCard;
