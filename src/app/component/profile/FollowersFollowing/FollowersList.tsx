"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import SingleUserListCard from "./SingleUserListCard";
import clsx from "clsx";

const FollowersList = ({
  id,
  tab,
}: {
  id: string;
  tab: "Followers" | "Following";
}) => {
  const user = useAppSelector((state) => state.auth);
  const chat = useAppSelector((state) => state.chat);

  const [activeTab, setActiveTab] = React.useState<string>(tab ?? "Followers");
  const { isLoading, data, error } = useQuery(
    ["followers", user.isUserAuthenticated],
    () => userApis.getFollowersFollowingList(id),
    { enabled: user.isUserAuthenticated }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const onlineUsersId = chat.OnlineUsers.map((user) => user._id);

  return (
    <div>
      <section>
        <section className="flex  bg-neutral-900 border-b border-neutral-500 border-opacity-60">
          <button
            onClick={() => {
              setActiveTab("Followers");
            }}
            className={clsx(
              " w-full text-base py-4  cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-black duration-200 transition-all ease-linear hover:shadow-lg ",
              activeTab === "Followers"
                ? "bg-black text-neutral-200"
                : "bg-transparent"
            )}
          >
            Followers
          </button>
          <button
            onClick={() => {
              setActiveTab("Following");
            }}
            className={clsx(
              " w-full text-base py-4  cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-black duration-200 transition-all ease-linear hover:shadow-lg ",
              activeTab === "Following"
                ? "bg-black text-neutral-200"
                : "bg-transparent"
            )}
          >
            Following
          </button>
        </section>
        <section className="mt-4 ">
          {activeTab === "Followers" &&
            data?.followers.map((user) => (
              <SingleUserListCard key={user._id} {...user} />
            ))}
          {activeTab === "Following" &&
            data?.following.map((user) => (
              <SingleUserListCard key={user._id} {...user} />
            ))}
        </section>
      </section>
    </div>
  );
};

export default FollowersList;
