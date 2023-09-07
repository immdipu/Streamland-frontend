import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Role } from "@/types/role";

interface TabButtonsProps {
  username: string;
  ownprofile: boolean;
  currentuserRole: Role;
}

const TabButtons: React.FC<TabButtonsProps> = ({
  username,
  ownprofile = false,
  currentuserRole,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const TabName = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(TabName ?? "about");
  // const Buttons = ["About", "Edit Profile", "Friends", "Account Settings"];
  const Buttons = ["About", "Edit Profile"];

  useEffect(() => {
    setActiveTab(TabName ?? "about");
  }, [TabName]);

  return (
    <>
      <div className=" pl-8 flex gap-8 flex-wrap max-md:gap-3 relative">
        {Buttons.filter((item) => {
          if (item === "Edit Profile")
            return ownprofile || currentuserRole === Role.admin;
          return true;
        }).map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                router.push(
                  `/profile/${username}?tab=${item
                    .split(" ")
                    .join("")
                    .toLowerCase()}`
                );
              }}
              className={clsx(
                "px-2 text-sm py-1  cursor-pointer max-md:text-xs hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-lg",
                activeTab === item.split(" ").join("").toLowerCase()
                  ? "bg-_blue text-_sidenav_bg"
                  : ""
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TabButtons;
