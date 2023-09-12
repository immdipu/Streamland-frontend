"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import SenderText from "./SenderText";
import ReceiverText from "./ReceiverText";
import { MessageTypes } from "@/types/chatTypes";
import { useAppSelector } from "@/redux/hooks";

interface AllMessagesProps {
  ChatId: string;
  setMessage: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  Messages: MessageTypes[];
}

const AllMessages: React.FC<AllMessagesProps> = ({
  ChatId,
  Messages,
  setMessage,
}) => {
  const user = useAppSelector((state) => state.auth);
  const { data, isLoading } = useQuery(
    ["getAllMessages", ChatId],
    () => userApis.getallMessages(ChatId),
    {
      onSuccess: (data) => {
        setMessage(data);
      },
    }
  );

  useEffect(() => {
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTo(0, messageContainer.scrollHeight);
    }
  }, [Messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-400"></div>
      </div>
    );
  }

  return (
    <>
      <section className="flex-grow px-36 pr-52  w-full message-container overflow-y-scroll pt-3   ">
        {Messages.length > 0 &&
          Messages.map((msg, index) => {
            if (msg.sender._id === user.id) {
              return (
                <SenderText
                  key={index}
                  lastMessageFromSameSender={
                    index > 0 &&
                    Messages[index - 1].sender._id === msg.sender._id
                  }
                  message={msg.content}
                />
              );
            } else {
              return (
                <ReceiverText
                  key={index}
                  lastMessageFromSameSender={
                    index > 0 &&
                    Messages[index - 1].sender._id === msg.sender._id
                  }
                  message={msg.content}
                />
              );
            }
          })}
      </section>
    </>
  );
};

export default AllMessages;
