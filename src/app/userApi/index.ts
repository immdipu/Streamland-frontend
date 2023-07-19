import { axiosInstance } from "@/utils/AxiosInterceptor";
import axios from "axios";
import { signupParamsTypes } from "@/types/userTypes";

const user = {
  signUp: async (data: signupParamsTypes) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/signup`,
      data
    );
    return res.data;
  },
};
