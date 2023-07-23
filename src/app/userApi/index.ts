import { axiosInstance } from "@/utils/AxiosInterceptor";
import axios from "axios";
import { signupParamsTypes, AddMediaDataTypes } from "@/types/userTypes";

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
};
