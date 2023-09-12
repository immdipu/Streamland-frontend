"use client";
import React from "react";
import MessageHeader from "./MessageHeader";
import { TbSend } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";
import AllMessages from "./AllMessages";
import { MessageTypes } from "@/types/chatTypes";
import { useAppSelector } from "@/redux/hooks";

interface sendMessageTypes {
  content: string;
  chatId: string;
}

const SingleMessage = () => {
  const searchParams = useSearchParams();
  const ChatId = searchParams.get("id");
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.auth);

  const [message, setMessage] = React.useState("");
  const [Messages, setMessages] = React.useState<MessageTypes[]>([]);
  const sendMessage = useMutation(
    (data: sendMessageTypes) => userApis.sendMessage(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getAllMessages", "getAllChats"]);
        console.log("data", data);
      },
      onError: (data: any) => {
        if (data.response.data) {
          toast.error(data.response.data);
        } else {
          toast.error("Failed to add");
        }
      },
    }
  );

  if (!ChatId) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <h1 className="text-2xl text-neutral-400">No chat selected</h1>
      </div>
    );
  }
  const handleMsgSend = () => {
    let data = {
      content: message,
      chatId: ChatId,
    };

    let newMsg = {
      content: message,
      sender: {
        _id: user.id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      },
      createdAt: new Date().toISOString(),
      _id: "",
    } as MessageTypes;

    setMessages((prev) => [...prev, newMsg]);

    sendMessage.mutate(data);
    const contentEditable = document.querySelector(".MessageForm");
    if (contentEditable) {
      contentEditable.innerHTML = ""; // Clear the content
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMsgSend();
    }
  };

  return (
    <>
      <section className=" absolute bottom-0  top-0 flex-col  w-[calc(100%-384px)]">
        <MessageHeader />
        <section className=" mx-auto w-full  flex flex-col  h-[calc(100%-64px)]">
          <AllMessages
            setMessage={setMessages}
            ChatId={ChatId}
            Messages={Messages}
          />

          {/* SEND BUTTON */}
          <section className="py-1 px-36  mt-3 justify-self-end  flex items-center  pb-7 gap-3   w-full">
            <div className="w-full rounded-md min-h-[48px] flex items-center bg-neutral-800 py-1 px-3">
              <div
                contentEditable
                placeholder="Message"
                onKeyDown={handleKeyDown}
                className="text-neutral-100 bg-transparent   placeholder:text-xs  MessageForm w-full outline-none"
                onInput={(e) => {
                  const content = e.target as HTMLDivElement;
                  setMessage(content.textContent || "");
                }}
              ></div>
            </div>

            <button
              onClick={handleMsgSend}
              className=" bg-blue-500 rounded-full w-12  grid place-content-center h-12 shrink-0"
            >
              <TbSend className="text-3xl text-neutral-200" />
            </button>
          </section>
        </section>
      </section>
    </>
  );
};

export default SingleMessage;
