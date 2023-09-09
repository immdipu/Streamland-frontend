import React from "react";
import Images from "../ImageComponent/Image";
import { BsCalendar2Week } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import { getUserDataTypes } from "@/types/userTypes";
import { Role } from "@/types/role";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import clsx from "clsx";

interface ProfileCardProps extends getUserDataTypes {
  role: Role;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  _id,
  createdAt,
  email_verified,
  followers,
  following,
  fullName,
  genre,
  isFollowing,
  ownProfile,
  profilePic,
  username,
  email,
  role,
}) => {
  const [follow, setFollow] = React.useState<boolean>(isFollowing);
  const queryClient = useQueryClient();
  const updateFollow = useMutation((id: string) => userApis.FollowUser(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getUser"]);
    },
    onError: (data) => {
      toast.error("Failed to follow Try Again!");
    },
  });

  return (
    <>
      <div className="flex max-md:flex-col pl-5 py-7 max-md:mx-4 mx-11 bg-neutral-800 border-b-_welcometext_lightblue border-b border-opacity-20  rounded-t-lg">
        <div className="w-48 h-48  rounded-md">
          <Images
            src={profilePic}
            alt={username}
            height={200}
            width={200}
            ImageWidth={"full"}
            Imageheight={"full"}
            rounded="20px"
            objectFit="cover"
          />
        </div>
        <div className="mt-4 pl-7 w-full max-md:pl-0 max-md:mt-2">
          <div className=" w-full flex justify-between">
            <h4 className="font-semibold text-xl flex items-center pb-0">
              {fullName}{" "}
              <span
                className={clsx(
                  "font-light text-xs ml-4 rounded-3xl px-2 py-1",
                  email_verified
                    ? "text-green-400 border border-green-500"
                    : "text-red-300 border border-red-300"
                )}
              >
                {email_verified ? "Verified" : "Not Verified"}
              </span>
            </h4>
            {!ownProfile && (
              <button
                onClick={() => {
                  updateFollow.mutate(_id);
                  setFollow(!follow);
                }}
                className="border flex items-center mr-14 py-1 border-opacity-60 hover:border-opacity-100 transition-colors ease-linear duration-200 border-_light_white px-5 rounded-2xl"
              >
                {follow ? (
                  <span className="text-base max-md:text-sm  text-neutral-300 font-normal">
                    Following
                  </span>
                ) : (
                  <span className="text-base max-md:text-sm text-neutral-300 font-normal">
                    Follow
                  </span>
                )}
              </button>
            )}
          </div>
          <p className=" mb-2 pb-2 ">
            <span className="text-sm tracking-wide text-neutral-400 font-light">
              @{username}
            </span>
          </p>
          <section>
            <p className="flex items-center mb-3">
              <BsCalendar2Week className="text-neutral-300 mr-3" />
              <span className="text-neutral-300 tracking-wide font-normal text-sm">
                Joined:
              </span>
              {role === Role.admin ? (
                <span className="ml-2 text-sm  text-_light_white font-normal ">
                  {moment(createdAt).format("Y MMM DD")}
                </span>
              ) : (
                <span className="ml-2 text-sm  text-_light_white font-normal ">
                  {moment(createdAt).format("Y MMMM")}
                </span>
              )}
            </p>
            {ownProfile ||
              (role === Role.admin && (
                <p className="flex items-center mb-2 -translate-x-[2px]">
                  <HiMail className="text-neutral-300 mr-3 text-xl " />
                  <span className="text-neutral-300 tracking-wide font-normal text-sm">
                    Email:
                  </span>
                  <span className="ml-2 text-sm text-_light_white font-normal">
                    {email}
                  </span>
                </p>
              ))}
            <div className="flex items-center mb-2 mt-3 -translate-x-[2px]">
              <BiMoviePlay className="text-neutral-300 mr-3 text-xl " />
              <span className="text-neutral-300 tracking-wide font-normal text-sm">
                Genre:
              </span>
              <div className="flex flex-wrap gap-2 ml-2 ">
                {genre.length > 0 ? (
                  genre.map((item, index) => (
                    <span
                      key={index}
                      className=" text-xs shrink-0 py-1 border border-opacity-30 border-_welcometext_lightblue px-2 rounded-2xl  text-_light_white font-normal"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className=" text-xs p    text-_light_white font-normal">
                    Not Available
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center mt-4 gap-8 mb-2  translate-x-[4px]">
              <div>
                <span className="text-neutral-300 font-semibold tracking-wide text-sm">
                  {following.length}
                </span>
                <span className="ml-2 text-sm text-_light_white font-normal">
                  {" "}
                  Following
                </span>
              </div>
              <div>
                <span className="text-neutral-300 font-semibold tracking-wide  text-sm">
                  {followers.length}
                </span>
                <span className="ml-2 text-sm text-_light_white font-normal">
                  Followers
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
