import { useAppSelector } from "@/redux/hooks";
import { User } from "@/types/chatTypes";
import { Role } from "@/types/role";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomModal from "../../modal/CustomModal";
import MemberSeeMoreModal from "./MemberSeeMoreModal";

interface UserExtended extends User {
  owner: string;
}

const SingleMemberCard: React.FC<UserExtended> = ({
  _id,
  fullName,
  profilePic,
  role,
  username,
  owner,
}) => {
  const onlineUsers = useAppSelector((state) => state.chat.OnlineUsers);
  const user = useAppSelector((state) => state.auth);
  const ShowMoreBtn = (
    <div className=" flex  justify-center my-auto border-neutral-700 hover:bg-neutral-700 duration-300 ease-linear cursor-pointer transition-colors  rounded-full w-8 h-8 border items-center">
      <BsThreeDotsVertical className="text-neutral-300" />
    </div>
  );

  const isOnline = onlineUsers.find((user) => user._id === _id);

  return (
    <div className=" flex gap-3 py-2 px-7 hover:bg-neutral-800 duration-200 ease-linear">
      <div className="w-12 h-12 relative ">
        <Image
          alt={fullName}
          src={profilePic}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div
          className={clsx(
            " w-3 h-3 rounded-full absolute top-1 -right-0 border border-neutral-300",
            isOnline || user.id === _id ? "bg-green-500" : "bg-neutral-400"
          )}
        />
      </div>
      <div className="flex-1 ">
        <h1 className="font-Helvetica  items-center capitalize text-neutral-200 font-normal text-base">
          {fullName}{" "}
          {role === Role.admin && (
            <span className="border inline-block ml-5 border-_light_white rounded-full text-xs border-opacity-40 text-neutral-400 bg-neutral-800 px-2 py-[1px]">
              {role}
            </span>
          )}
          {_id === owner && (
            <span className="border inline-block ml-2 border-_light_white rounded-full text-xs border-opacity-40 text-neutral-100 bg-blue-500 px-2 py-[1px]">
              Owner
            </span>
          )}
        </h1>
        <h4 className="text-neutral-400 text-xs font-normal tracking-wide">
          @{username}
        </h4>
      </div>
      <div className="flex relative items-center">
        <CustomModal
          buttonElement={ShowMoreBtn}
          data={
            <MemberSeeMoreModal
              _id={_id}
              fullName={fullName}
              owner={owner}
              profilePic={profilePic}
              role={role}
              username={username}
            />
          }
          width={60}
        />
      </div>
    </div>
  );
};

export default SingleMemberCard;
