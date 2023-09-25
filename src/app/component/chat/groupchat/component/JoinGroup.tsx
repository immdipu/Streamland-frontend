"use client";
import React from "react";
import SmallLoader from "@/app/component/loader/SmallLoader";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentActiveChat } from "@/redux/slice/chatSlice";
import { GroupChatTypes } from "@/types/chatTypes";

const JoinGroup = () => {
  const user = useAppSelector((state) => state.auth);
  const currentChat = useAppSelector((state) => state.chat.currentActiveChat);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: any) => userApis.addToGroupChat(data),
    {
      onSuccess: () => {
        toast.success("You have joined the group");
        let newdata = {
          ...currentChat,
          isMember: true,
          users: [...(currentChat?.users as string[]), user.id!],
        } as GroupChatTypes;

        dispatch(setCurrentActiveChat(newdata));
      },

      onError: (error: any) => {
        toast.error(error?.message);
      },
    }
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl  text-neutral-400">
          You are not a member of this group
        </h2>
        <button
          disabled={isLoading}
          onClick={() => mutate({ chatId: currentChat?._id, userId: user.id })}
          className="bg-blue-600 flex items-center gap-2 hover:bg-blue-700 active:scale-95 text-neutral-200  w-fit px-4 py-1  rounded-md"
        >
          {isLoading && <SmallLoader size={13} />} Join now
        </button>
      </div>
    </>
  );
};

export default JoinGroup;
