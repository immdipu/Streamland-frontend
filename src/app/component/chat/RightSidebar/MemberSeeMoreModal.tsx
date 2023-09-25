import React, { use } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { MdBlockFlipped, MdGroupRemove, MdGppGood } from "react-icons/md";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/types/chatTypes";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SmallLoader from "../../loader/SmallLoader";
import { useQueryClient } from "@tanstack/react-query";

interface UserExtended extends User {
  owner: string;
}

const MemberSeeMoreModal: React.FC<UserExtended> = ({
  _id,
  fullName,
  owner,
  profilePic,
  role,
  username,
}) => {
  const user = useAppSelector((state) => state.auth);
  const chat = useAppSelector((state) => state.chat);
  const queryClient = useQueryClient();
  const router = useRouter();
  const createAccessChat = useMutation(
    (id: string) => userApis.createAccessChat(id),
    {
      onSuccess: (data) => {
        router.push(`/chat?id=${data._id}&type=personal`);
      },
      onError: (data) => {
        toast.error("Failed to create access chat Try Again!");
      },
    }
  );
  const RemoveMember = useMutation(
    (data: { chatId: string; userId: string }) =>
      userApis.removeFromGroupChat(data),
    {
      onSuccess: () => {
        toast.success("Removed Successfully");
        queryClient.invalidateQueries([
          "GetGroupDetails",
          chat.currentActiveChat?._id!,
        ]);
      },
      onError: (data) => {
        toast.error("Failed to create access chat Try Again!");
      },
    }
  );

  const handleStartMessage = () => {
    createAccessChat.mutate(_id);
  };

  return (
    <div className="py-4">
      <ul>
        {_id !== user.id && (
          <li
            onClick={handleStartMessage}
            className="flex gap-5 hover:bg-neutral-800 text-base transition-colors duration-200 ease-linear cursor-pointer py-2 items-center px-4 text-neutral-300"
          >
            <BsFillChatDotsFill className="text-neutral-400" />{" "}
            <span className="font-light ">Send Message</span>
          </li>
        )}
        <Link
          href={`profile/${username}`}
          className="flex gap-5 hover:bg-neutral-800 text-base transition-colors duration-200 ease-linear cursor-pointer py-2 items-center px-4 text-neutral-300"
        >
          <IoPersonSharp className="text-neutral-400" />{" "}
          <span className="font-light ">View Profile</span>
        </Link>

        {user.id === owner && _id !== user.id && (
          <li
            onClick={() => {
              RemoveMember.mutate({
                chatId: chat.currentActiveChat?._id!,
                userId: _id,
              });
            }}
            className="flex gap-5 hover:bg-neutral-800 text-base transition-colors duration-200 ease-linear cursor-pointer py-2 items-center px-4 text-neutral-300"
          >
            <MdGroupRemove className="text-red-400 text-xl" />
            <span className="font-light text-red-400 ">Remove Member</span>
          </li>
        )}

        {user.id === owner && _id !== user.id && (
          <li className="flex gap-5 hover:bg-neutral-800 text-base transition-colors duration-200 ease-linear cursor-pointer py-2 items-center px-4 text-neutral-300">
            <MdBlockFlipped className="text-red-400 text-xl" />
            <span className="font-light text-red-400 ">Block</span>
          </li>
        )}
        {user.id === owner && _id !== user.id && (
          <li className="flex gap-5 hover:bg-neutral-800 text-base transition-colors duration-200 ease-linear cursor-pointer py-2 items-center px-4 text-neutral-300">
            <MdGppGood className="text-green-400 text-xl" />
            <span className="font-light text-green-400 ">Make Admin</span>
          </li>
        )}
        {user.id === _id && (
          <li className="flex gap-5 hover:bg-neutral-800 text-base transition-colors duration-200 ease-linear cursor-pointer py-2 items-center px-4 text-neutral-300">
            <MdBlockFlipped className="text-red-400 text-xl" />
            <span className="font-light text-red-400 ">Leave Group</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MemberSeeMoreModal;
