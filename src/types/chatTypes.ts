import { Role } from "./role";

interface User {
  _id: string;
  username: string;
  profilePic: string;
  fullName: string;
}

export interface MessageTypes {
  _id: string;
  content: string;
  createdAt: string;
  chat: ChatsTypes;
  sender: User;
}

interface latestMessageProps {
  content: string;
  sender: string;
  createdAt: string;
}

export interface ChatsTypes {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  createdAt: string;
  updatedAt: string;
  latestMessage?: latestMessageProps;
}

export interface OnlineUsersTypese {
  _id: string;
  username: string;
  fullName: string;
  profilePic: string;
  role: Role;
}
