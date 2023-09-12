import React from "react";
import Image from "next/image";
import { ChatsTypes } from "@/types/chatTypes";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import moment from "moment";

const SingleUserCard: React.FC<ChatsTypes> = ({
  _id,
  chatName,
  createdAt,
  isGroupChat,
  updatedAt,
  users,
  latestMessage,
}) => {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();
  const userChat = users.filter((item) => item._id !== user.id);

  return (
    <>
      <div
        onClick={() => {
          router.push(`/chat?id=${_id}`);
        }}
        className="flex py-2 hover:bg-neutral-800 px-4 transition-colors duration-300 ease-linear gap-2 items-center"
      >
        <div className="shrink-0 grid place-content-center h-12 w-12 rounded-full  ">
          <Image
            // src={`https://avatars.dicebear.com/api/avataaars/dipu.svg`}
            src={userChat[0].profilePic}
            alt="profile"
            width={50}
            height={50}
          />
        </div>

        <div className="overflow-hidden">
          <div className="flex w-full items-center border justify-between">
            <h3 className="text-neutral-200 flex-grow capitalize font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {userChat[0].fullName}
            </h3>
            {latestMessage && (
              <p className="font-light text-xs text-neutral-400 whitespace-nowrap">
                {moment(latestMessage.createdAt).fromNow()}
              </p>
            )}
          </div>

          <div className="flex">
            {latestMessage ? (
              <p className="text-neutral-400  whitespace-nowrap pr-3 w-full text-ellipsis font-light text-sm  overflow-hidden">
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
  );
};

export default SingleUserCard;
