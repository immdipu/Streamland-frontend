import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatsTypes, OnlineUsersTypese } from "@/types/chatTypes";

interface initialStateProps {
  currentActiveChat: ChatsTypes | null;
  OnlineUsers: OnlineUsersTypese[];
}

const initialState: initialStateProps = {
  currentActiveChat: null,
  OnlineUsers: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentActiveChat: (state, action: PayloadAction<ChatsTypes>) => {
      state.currentActiveChat = action.payload;
    },
    addOnlineUser: (state, action: PayloadAction<OnlineUsersTypese>) => {
      state.OnlineUsers.push(action.payload);
    },
    removeOnlineUser: (state, action: PayloadAction<OnlineUsersTypese>) => {
      state.OnlineUsers = state.OnlineUsers.filter(
        (user) => user._id !== action.payload._id
      );
    },
  },
});
export const { setCurrentActiveChat, addOnlineUser, removeOnlineUser } =
  chatSlice.actions;

export default chatSlice.reducer;
