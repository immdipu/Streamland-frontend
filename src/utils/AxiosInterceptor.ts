import axios, { AxiosInstance, AxiosStatic } from "axios";
import { toast } from "react-hot-toast";

export const axiosInstance = (): AxiosInstance => {
  const URL = process.env.NEXT_PUBLIC_USER_URL;
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Token expired Login Again!");
  }
  return axios.create({
    baseURL: URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};
