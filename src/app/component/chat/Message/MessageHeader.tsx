import React from "react";
import Image from "next/image";

const MessageHeader = () => {
  return (
    <div className="bg-neutral-900 w-full h-16  flex items-center px-5">
      <div className="shrink-0 grid place-content-center h-12 w-12 rounded-full  ">
        <Image
          src={"https://i.imgur.com/phEO72D.png"}
          alt="profile"
          width={50}
          height={50}
        />
      </div>
      <div className="ml-4">
        <h3 className="text-neutral-200 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          Dipu chaurasiya
        </h3>
        <p className="font-light text-xs text-neutral-400 whitespace-nowrap">
          online
        </p>
      </div>
    </div>
  );
};

export default MessageHeader;
