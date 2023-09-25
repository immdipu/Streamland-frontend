"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import SenderText from "./SenderText";
import ReceiverText from "./ReceiverText";
import { MessageTypes } from "@/types/chatTypes";
import { useAppSelector } from "@/redux/hooks";
import { useSocket } from "@/context/SocketProvider";
import toast from "react-hot-toast";
import AllMessagesSkeleton from "../../skeleton/AllMessagesSkeleton";

interface AllMessagesProps {
  ChatId: string;
  setMessage: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  Messages: MessageTypes[];
  isTyping: boolean;
}

// eslint-disable-next-line react/display-name
const AllMessages: React.FC<AllMessagesProps> = React.memo(
  ({ ChatId, Messages, isTyping, setMessage }) => {
    const user = useAppSelector((state) => state.auth);

    const { EmitCustomEvent, socket } = useSocket();
    const { isLoading, error } = useQuery(
      ["getAllMessages", ChatId],
      () => userApis.getallMessages(ChatId),
      {
        onSuccess: (data) => {
          setMessage(data);
        },
        onError: (err) => {
          setMessage([]);
        },
        retry: 2,
        refetchOnWindowFocus: false,
        onSettled: () => {
          if (!socket) return;
          EmitCustomEvent("joinAConversation", ChatId);
        },
      }
    );

    useEffect(() => {
      const messageContainer = document.querySelector(".message-container");
      if (messageContainer) {
        messageContainer.scrollTo(0, messageContainer.scrollHeight);
      }
    }, [Messages]);

    useEffect(() => {
      if (!socket) return;

      const handleMessageReceived = (data: MessageTypes) => {
        console.log(data, "message received");
        if (data.chat._id === ChatId) {
          setMessage((prev) => [...prev, data]);
        } else {
          console.log(data);
          toast.success(`New message from ${data.sender.fullName}`);
        }
      };
      socket.on("message received", handleMessageReceived);
      return () => {
        socket.off("message received", handleMessageReceived);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ChatId, socket]);

    if (isLoading) {
      return <AllMessagesSkeleton />;
    }

    if (error && Messages.length === 0) {
      if (
        (error as { response?: { status?: number } })?.response?.status === 404
      ) {
        return (
          <div className="flex items-center justify-center h-screen">
            {" "}
            <h1 className="text-2xl text-neutral-400">No Message found</h1>
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center h-screen">
          {" "}
          <h1 className="text-2xl text-neutral-400">Something went wrong</h1>
        </div>
      );
    }

    return (
      <>
        <section className="flex-grow px-36  pr-52  w-full message-container overflow-y-scroll pt-3 max-xl:px-28 max-lg:px-8  max-md:px-3 max-md:pl-8  ">
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
                    date={msg.createdAt}
                  />
                );
              } else {
                return (
                  <ReceiverText
                    senderPicture={msg.sender.profilePic}
                    key={index}
                    senderId={msg.sender._id}
                    lastMessageFromSameSender={
                      index > 0 &&
                      Messages[index - 1].sender._id === msg.sender._id
                    }
                    message={msg.content}
                    date={msg.createdAt}
                  />
                );
              }
            })}
          <>
            {isTyping && (
              <div className="flex items-center justify-start mb-2 mt-4 ">
                <p className="text-neutral-500 font-light italic">Typing...</p>
              </div>
            )}
          </>
        </section>
      </>
    );
  }
);

export default AllMessages;
