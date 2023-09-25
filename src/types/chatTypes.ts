import { Role } from "./role";

export interface User {
  _id: string;
  username: string;
  profilePic: string;
  fullName: string;
  role: Role;
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
  isMember: boolean;
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

export interface GroupChatTypes {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: string[];
  createdAt: string;
  isMember: boolean;
  groupAdmin: string;
  numberOfUsersAllowed: number;
  updatedAt: string;
  latestMessage?: latestMessageProps;
}

export interface GroupDetailsTypes {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  createdAt: string;
  groupAdmin: string;
  numberOfUsersAllowed: number;
}
