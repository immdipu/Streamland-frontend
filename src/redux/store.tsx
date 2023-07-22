import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
