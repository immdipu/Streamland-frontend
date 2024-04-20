import { Role } from "@/types/role";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

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
    <Suspense>
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
                "px-2 text-sm py-1  cursor-pointer max-md:text-xs border border-neutral-700 hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg rounded-md",
                activeTab === item.split(" ").join("").toLowerCase()
                  ? "bg-_blue text-_sidenav_bg "
                  : "text-neutral-300"
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </Suspense>
  );
};

export default TabButtons;
