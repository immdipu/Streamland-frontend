import { Role } from "./role";

export interface signupParamsTypes {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface loginResponseTypes {
  fullName: string;
  username: string;
  _id: string;
  profilePic: string;
  token?: string;
  role: Role;
}

export interface AddMediaDataTypes {
  id: string;
  original_title?: string;
  name?: string;
  title?: string;
  backdrop_path?: string;
  poster_path?: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  type?: "history" | "watchlist" | "favorite";
}

export interface AddMediaResponse extends AddMediaDataTypes {
  createdAt: string;
  _id: string;
  Index: number;
}

export interface feedbackDataTypes {
  name?: string;
  user?: string;
  message: string;
}

export interface getUserDataTypes {
  genre: string[];
  createdAt: Date;
  following: string[];
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  email_verified: boolean;
  followers: string[];
  ownProfile: boolean;
  isFollowing: boolean;
  email?: string;
  facebook?: string;
  bio?: "";
  twitter?: string;
  instagram?: string;
  github?: string;
}

export interface EditProfileDataTypes {
  fullName?: string;
  username?: string;
  bio?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  profilePic?: string;
  genre?: string[];
}

export interface userList {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  role: Role;
  isFollowing: boolean;
}

export interface getUserListTypes {
  data: userList[];
  page: number;
  results: number;
}

export interface FollowFollowersTypes {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  isFollowing: boolean;
  isAFollower: boolean;
  role: Role;
}
export interface FollowFollowingList {
  followers: FollowFollowersTypes[];
  following: FollowFollowersTypes[];
}
