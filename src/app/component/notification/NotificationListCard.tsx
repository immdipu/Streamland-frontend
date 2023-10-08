import React from "react";

const NotificationListCard = ({ text }: { text: string }) => {
  return (
    <div className="pl-3 py-4  hover:bg-neutral-900 pr-2 border-b border-neutral-500 border-opacity-40 ">
      <h3 className="w-full text-base text-neutral-300  ">{text}</h3>
    </div>
  );
};

export default NotificationListCard;
