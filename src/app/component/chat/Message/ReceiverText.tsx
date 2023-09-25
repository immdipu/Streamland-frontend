/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import React from "react";
import moment from "moment";
import { useAppSelector } from "@/redux/hooks";

const ReceiverText = ({
  lastMessageFromSameSender,
  message,
  date,
  senderPicture,
  senderId,
}: {
  lastMessageFromSameSender: boolean;
  senderId: string;
  message: string;
  date: string;
  senderPicture: string;
}) => {
  const OnlineUsers = useAppSelector((state) => state.chat.OnlineUsers);
  const isOnline = OnlineUsers.find((user) => user._id === senderId);
  return (
    <div
      className={clsx(
        "flex justify-start relative",
        lastMessageFromSameSender ? "mt-1" : "mt-5 "
      )}
    >
      {!lastMessageFromSameSender && (
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          className="absolute -left-2 top-0"
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 8 13"
          xmlSpace="preserve"
        >
          <path
            opacity="0.13"
            fill="#434343"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            fill="#434343"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      )}

      {!lastMessageFromSameSender && (
        <div className="w-6 h-6 rounded-full absolute -left-8 top-1">
          <img src={senderPicture} className="w-6 h-6 rounded-full" alt="" />
          <div
            className={clsx(
              " w-2 h-2 rounded-full absolute bottom-0 -right-0 border border-neutral-400",
              isOnline ? "bg-green-500" : "bg-neutral-600"
            )}
          />
        </div>
      )}
      <div
        className={clsx(
          "bg-[#434343] rounded-lg py-2 max-w-xs relative",
          lastMessageFromSameSender ? "rounded-md" : "rounded-tl-none"
        )}
      >
        <p className="text-white font-light  break-words text-sm pl-2">
          {message}{" "}
          <span className="">
            <span className="px-3">
              {" "}
              <span className="opacity-0 text-xs">
                {" "}
                {moment(date).format("hh:mm a")}{" "}
              </span>{" "}
            </span>
          </span>
        </p>
        <div className=" w-full flex justify-end absolute  right-1 bottom-1 ">
          <span className="text-[0.65rem] text-neutral-400 font-extralight ">
            {moment(date).format("hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiverText;
