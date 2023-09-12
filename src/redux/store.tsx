import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slice/authSlice";
import chatSlice from "./slice/chatSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    chat: chatSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
