import React, { useEffect, Suspense } from "react";
import moment from "moment";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentActiveChat } from "@/redux/slice/chatSlice";
import { GroupChatTypes } from "@/types/chatTypes";
import clsx from "clsx";
import Image from "next/image";

const SingleGroupChatCard: React.FC<GroupChatTypes> = ({
  _id,
  chatName,
  createdAt,
  isGroupChat,
  groupAdmin,
  isMember,
  numberOfUsersAllowed,
  updatedAt,
  users,
  latestMessage,
}) => {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();
  const chatId = useSearchParams().get("id");
  const chatType = useSearchParams().get("type");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (chatId === _id) {
      dispatch(
        setCurrentActiveChat({
          _id,
          chatName,
          createdAt,
          isGroupChat,
          isMember,
          updatedAt,
          users,
          latestMessage,
        } as GroupChatTypes)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);
  return (
    <Suspense>
      <>
        <div
          onClick={() => {
            router.push(`/chat?id=${_id}&type=${chatType}`);
          }}
          className={clsx(
            "flex  py-2 hover:bg-neutral-800 px-4 cursor-pointer transition-colors duration-300 ease-linear gap-2 items-center",
            chatId === _id && "bg-neutral-800"
          )}
        >
          <div className="shrink-0 grid border border-neutral-500 p-1 border-opacity-60 place-content-center h-12 w-12 rounded-full overflow-auto ">
            <Image
              src={`https://avatars.dicebear.com/api/bottts/${chatName}.svg`}
              alt="profile"
              width={50}
              height={50}
            />
          </div>

          <div className="overflow-hidden w-full">
            <div className="flex w-full items-center  justify-between">
              <h3 className="text-neutral-200 flex-grow capitalize font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {chatName}
              </h3>
              {latestMessage && (
                <p className="font-light text-xs text-neutral-400 whitespace-nowrap">
                  {moment(latestMessage.createdAt).fromNow()}
                </p>
              )}
            </div>

            <div className="flex">
              {latestMessage ? (
                <p
                  className={clsx(
                    "text-neutral-400  whitespace-nowrap pr-3 w-full text-ellipsis font-light text-xs  overflow-hidden"
                  )}
                >
                  <span>{latestMessage.sender === user.id ? "You " : ""}</span>{" "}
                  {latestMessage.content}
                </p>
              ) : (
                <p className="text-neutral-400  whitespace-nowrap pr-3 w-full text-ellipsis font-light text-sm  overflow-hidden">
                  No messages
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default SingleGroupChatCard;
