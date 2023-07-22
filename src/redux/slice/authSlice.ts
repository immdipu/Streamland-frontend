import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginResponseTypes } from "@/types/userTypes";

interface initialStateProps {
  fullName: string | null;
  username: string | null;
  isUserAuthenticated: boolean;
  token: string | null;
  id: string | null;
  profilePic: string | null;
}

const initialState: initialStateProps = {
  fullName: null,
  username: null,
  isUserAuthenticated: false,
  token: null,
  id: null,
  profilePic: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoggedIn: (state, action: PayloadAction<loginResponseTypes>) => {
      state.fullName = action.payload.fullName;
      state.isUserAuthenticated = true;
      state.profilePic = action.payload.profilePic;
      state.username = action.payload.username;
      state.id = action.payload._id;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    LoggedOut: (state) => {
      state.fullName = null;
      state.id = null;
      state.profilePic = null;
      state.username = null;
      state.isUserAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { LoggedIn, LoggedOut } = authSlice.actions;
export default authSlice.reducer;
