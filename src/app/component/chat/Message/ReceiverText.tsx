import clsx from "clsx";
import React from "react";

const ReceiverText = ({
  lastMessageFromSameSender,
  message,
}: {
  lastMessageFromSameSender: boolean;
  message: string;
}) => {
  return (
    <div
      className={clsx(
        "flex justify-start",
        lastMessageFromSameSender ? "mt-1" : "mt-5"
      )}
    >
      <div className="bg-gray-500 rounded-lg p-3 max-w-xs">
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default ReceiverText;
