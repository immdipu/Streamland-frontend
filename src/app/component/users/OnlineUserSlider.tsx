"use client";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/role";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import SingleUserRoundCard from "./SingleUserRoundCard";
const AllUsers = dynamic(() => import("./AllUsers"));
const CustomModal = dynamic(() => import("@/app/component/modal/CustomModal"));

const OnlineUserSlider = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);
  const user = useAppSelector((state) => state.auth);
  const chat = useAppSelector((state) => state.chat);
  const className = "onlineUser";

  if (!user.isUserAuthenticated) {
    return null;
  }

  const handleLeftScrollClick = () => {
    const container = document.querySelector(`.${className}`);
    container?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const handleRightScrollClick = () => {
    const container = document.querySelector(`.${className}`);
    container?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  const btn = (
    <button className="my-2 text-sm hover:text-neutral-100 transition-colors duration-200 ease-linear text-neutral-300">
      See More
    </button>
  );

  return (
    <>
      <div className="flex items-center">
        {showLeftButton && (
          <div
            className="border-[0.4px] border-_light_white rounded-sm mb-14 border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch mr-3 max-md:mr-0 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
            onClick={handleLeftScrollClick}
          >
            <MdKeyboardArrowLeft className="text-2xl text-_light_white" />
          </div>
        )}
        <div
          ref={containerRef}
          className={
            "overflow-x-auto flex-1 w-full card_container max-md:gap-3 flex gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap " +
            `${className}`
          }
        >
          {chat.OnlineUsers.length > 0 &&
            [...chat.OnlineUsers]
              .sort((a, b) => {
                if (a.role === "admin") return -1;
                return 0;
              })
              .map((item) => {
                // if (item._id === user.id && item.role !== Role.admin) return null;
                return <SingleUserRoundCard key={item._id} {...item} />;
              })}

          {!chat.OnlineUsers ||
            (chat.OnlineUsers?.length == 0 && (
              <>
                <div className=" mb-11 w-full grid place-content-center">
                  <h2 className="text-neutral-400 ">No online users found</h2>
                </div>
              </>
            ))}
        </div>
        {showRightButton && (
          <div
            onClick={handleRightScrollClick}
            className="border-[0.4px] border-_light_white mb-14 rounded-sm border-opacity-0 hover:bg-_dark hover:bg-opacity-10 self-stretch ml-3 max-md:ml-0 hover:border-opacity-25 transition-all duration-300 ease-in-out cursor-pointer  flex items-center"
          >
            <MdKeyboardArrowRight className="text-2xl text-_light_white" />
          </div>
        )}
      </div>
      {user.role === Role.admin && (
        <div className="  flex mt-4 bg-neutral-800 rounded-xl justify-center ">
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
  );
};

export default OnlineUserSlider;
