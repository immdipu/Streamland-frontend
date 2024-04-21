import axios, { AxiosInstance } from "axios";

export const axiosInstance = (): AxiosInstance => {
  const URL = process.env.NEXT_PUBLIC_USER_URL;
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};
