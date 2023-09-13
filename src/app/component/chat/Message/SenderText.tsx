"use client";
import React from "react";
import clsx from "clsx";

const SenderText = ({
  lastMessageFromSameSender,
  message,
}: {
  lastMessageFromSameSender: boolean;
  message: string;
}) => {
  return (
    <div
      className={clsx(
        "flex justify-end ",
        lastMessageFromSameSender ? "mt-1" : "mt-5"
      )}
    >
      <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default SenderText;
