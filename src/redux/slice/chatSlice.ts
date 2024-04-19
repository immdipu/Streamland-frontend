import {
  ChatsTypes,
  GroupChatTypes,
  OnlineUsersTypese,
} from "@/types/chatTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  currentActiveChat: ChatsTypes | GroupChatTypes | null;
  OnlineUsers: OnlineUsersTypese[];
  showChatSidebar: boolean;
  showRightSidebar: boolean;
}

const initialState: initialStateProps = {
  currentActiveChat: null,
  OnlineUsers: [],
  showChatSidebar: false,
  showRightSidebar: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentActiveChat: (
      state,
      action: PayloadAction<ChatsTypes | GroupChatTypes>
    ) => {
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
    toggelChatSidebar: (state) => {
      state.showChatSidebar = !state.showChatSidebar;
    },
    toggelRightSidebar: (state) => {
      state.showRightSidebar = !state.showRightSidebar;
    },
  },
});
export const {
  setCurrentActiveChat,
  addOnlineUser,
  removeOnlineUser,
  toggelChatSidebar,
  toggelRightSidebar,
} = chatSlice.actions;

export default chatSlice.reducer;
