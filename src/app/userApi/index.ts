import { axiosInstance } from "@/utils/AxiosInterceptor";
import axios from "axios";
import {
  signupParamsTypes,
  AddMediaDataTypes,
  getUserDataTypes,
  feedbackDataTypes,
  EditProfileDataTypes,
} from "@/types/userTypes";

export const userApis = {
  signUp: async (data: signupParamsTypes) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/signup`,
      data
    );
    return res.data;
  },

  GoogleLogin: async (token: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/googlelogin`,
      {
        token,
      }
    );
    return res.data;
  },
  AutoLogin: async () => {
    const res = await axiosInstance().get("/user/login");
    return res.data;
  },
  LogIn: async (data: any) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/login`,
      data
    );
    return res.data;
  },
  AddMedia: async (data: AddMediaDataTypes) => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/addmedia`,
      data
    );
    return res.data;
  },
  GetAllMedia: async () => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/media`
    );
    return res.data;
  },
  RemoveMedia: async (id: string) => {
    const res = await axiosInstance().delete(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/${id}`
    );
    return res.data;
  },
  SendFeeback: async (data: feedbackDataTypes) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/feedback`,
      data
    );
    return res.data;
  },
  GetNotification: async (): Promise<string[]> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USER_URL}/media/notification`
    );
    return res.data;
  },
  GetUserProfile: async (username: string): Promise<getUserDataTypes> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/${username}`
    );
    return res.data;
  },
  FollowUser: async (id: string): Promise<string> => {
    const res = await axiosInstance().get(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/follow/${id}`
    );
    return res.data;
  },
  EditProfile: async (
    data: EditProfileDataTypes
  ): Promise<EditProfileDataTypes> => {
    const res = await axiosInstance().post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/editprofile`,
      data
    );
    return res.data;
  },
};
