"use client";
import React, { useEffect, useState, useRef } from "react";
import MessageHeader from "./MessageHeader";
import { TbSend } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";
import AllMessages from "./AllMessages";
import { MessageTypes } from "@/types/chatTypes";
import { useAppSelector } from "@/redux/hooks";
import { useSocket } from "@/context/SocketProvider";
import JoinGroup from "../groupchat/component/JoinGroup";
import RightSidebar from "../RightSidebar/RightSidebar";
import data, { Emoji } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { HiOutlineEmojiHappy } from "react-icons/hi";

interface sendMessageTypes {
  content: string;
  chatId: string;
}

const SingleMessage = () => {
  const searchParams = useSearchParams();
  const ChatId = searchParams.get("id");
  const user = useAppSelector((state) => state.auth);
  const { EmitCustomEvent, socket } = useSocket();
  const currentActiveChat = useAppSelector(
    (state) => state.chat.currentActiveChat
  );

  const [message, setMessage] = React.useState("");
  const [Messages, setMessages] = React.useState<MessageTypes[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messageDivRef = useRef<HTMLDivElement>(null);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (!user.isUserAuthenticated || !socket) return;
    function handleUserTyping(chatId: string) {
      if (ChatId === chatId) {
        const messageContainer = document.querySelector(".message-container");
        if (messageContainer) {
          messageContainer.scrollTo(0, messageContainer.scrollHeight);
        }
        setIsTyping(true);
      }
    }

    function handleUserStopTyping(chatId: string) {
      if (ChatId === chatId) {
        setIsTyping(false);
      }
    }

    if (
      currentActiveChat &&
      currentActiveChat.isGroupChat &&
      !currentActiveChat.isMember
    ) {
      return;
    }

    socket.on("Usertyping", handleUserTyping);
    socket.on("userStopTyping", handleUserStopTyping);

    return () => {
      socket.off("Usertyping", handleUserTyping);
      socket.off("userStopTyping", handleUserStopTyping);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ChatId, user.isUserAuthenticated, socket]);

  const sendMessage = useMutation(
    (data: sendMessageTypes) => userApis.sendMessage(data),
    {
      onSuccess: (data) => {
        EmitCustomEvent("new message", data);
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

  if (!user.isUserAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <h1 className="text-2xl text-neutral-400">Please login to continue</h1>
      </div>
    );
  }

  if (!ChatId) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <h1 className="text-2xl text-neutral-400">No chat selected</h1>
      </div>
    );
  }

  if (
    currentActiveChat &&
    currentActiveChat.isGroupChat &&
    currentActiveChat.isMember === false
  ) {
    return (
      <div className="grid  h-screen place-items-center">
        <JoinGroup />
      </div>
    );
  }

  const handleMsgSend = () => {
    if (!message || message.trim() === "") {
      return toast.error("Message can't be empty");
    }

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
    setMessage("");
    if (contentEditable) {
      contentEditable.innerHTML = "";
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMsgSend();

      EmitCustomEvent("stop typing", ChatId);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }
    }
  };

  const handleInput = (e: any) => {
    const content = e.target as HTMLDivElement;
    setMessage(content.textContent || "");

    if (typingTimeout !== null) {
      clearTimeout(typingTimeout); // Clear the previous timeout if it exists
    }
    const newTimeout = setTimeout(() => {
      socket?.emit("stop typing", ChatId);
      setTypingTimeout(null);
    }, 3000);

    setTypingTimeout(newTimeout);
    socket?.emit("typing", ChatId);
  };

  return (
    <section className=" absolute bottom-0 flex  top-0  max-md:w-full  w-[calc(100%-384px)]">
      <section className="flex-col w-full">
        {currentActiveChat && (
          <MessageHeader
            fullName={
              currentActiveChat.isGroupChat
                ? currentActiveChat.chatName
                : typeof currentActiveChat.users[0] === "string"
                ? currentActiveChat.users[0]
                : currentActiveChat.users[0].fullName
            }
            profilePic={
              typeof currentActiveChat.users[0] === "string"
                ? `https://avatars.dicebear.com/api/bottts/${currentActiveChat.chatName}.svg`
                : currentActiveChat.users[0].profilePic
            }
            id={
              typeof currentActiveChat.users[0] === "string"
                ? null
                : currentActiveChat.users[0]._id
            }
            isGroupChat={currentActiveChat.isGroupChat}
          />
        )}
        <section className=" mx-auto w-full  flex flex-col  h-[calc(100%-64px)]">
          <AllMessages
            setMessage={setMessages}
            ChatId={ChatId}
            Messages={Messages}
            isTyping={isTyping}
          />

          {/* SEND BUTTON */}
          <section className="py-1 px-36 max-xl:px-28  mt-3 justify-self-end  flex items-center  pb-7 gap-3 max-lg:px-8  max-md:px-2  w-full">
            <div className="w-full rounded-md  relative min-h-[48px] flex items-center bg-neutral-800 py-1 px-3">
              <div
                contentEditable
                placeholder="Message"
                className="text-neutral-100 bg-transparent   placeholder:text-xs  MessageForm w-full outline-none"
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                ref={messageDivRef}
              ></div>
              <HiOutlineEmojiHappy
                className="text-neutral-400 text-2xl cursor-pointer"
                onClick={() => setShowEmoji(!showEmoji)}
              />
              {showEmoji && (
                <div className="absolute  bottom-14 right-0 z-10">
                  <Picker
                    data={data}
                    onClickOutside={() => setShowEmoji(false)}
                    onEmojiSelect={(e: any) => {
                      setMessage(message + e.native);
                      if (messageDivRef.current) {
                        messageDivRef.current.innerHTML += e.native;
                      }
                    }}
                  />
                </div>
              )}
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
      <RightSidebar ChatId={ChatId} />
    </section>
  );
};

export default SingleMessage;
