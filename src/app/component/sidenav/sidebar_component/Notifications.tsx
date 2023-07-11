"use client";

import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import data from "../../../../utils/NotficationsMsg.json";
import clsx from "clsx";

const Notifications = () => {
  const [showNotifi, setShowNotifi] = useState(true);

  return (
    <>
      <div
        className={clsx(
          "absolute bottom-5 bg-neutral-800 pl-3  rounded-md  min-h-[3rem] left-0 right-0",
          showNotifi ? " " : "hideNotifi"
        )}
      >
        <IoIosClose
          onClick={() => setShowNotifi(false)}
          className="absolute cursor-pointer scale-150 right-1 top-1 tex-2xl"
        />
        <div className="text-sm gap-2  flex text-white py-3">
          <span className="bg-green-500   font-semibold text-center rounded-full block w-6 h-6">
            {data.length}
          </span>
          <span className="block ">updates</span>
        </div>
        <div className="flex flex-col gap-1 pr-2 pb-5 ">
          {data.map((item, index) => {
            return (
              <p
                key={index}
                className="text-sm tracking-wide break-words text-neutral-300 font-light"
              >
                {index + 1}. {item}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notifications;
