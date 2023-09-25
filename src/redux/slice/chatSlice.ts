import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ChatsTypes,
  GroupChatTypes,
  OnlineUsersTypese,
} from "@/types/chatTypes";

interface initialStateProps {
  currentActiveChat: ChatsTypes | GroupChatTypes | null;
  OnlineUsers: OnlineUsersTypese[];
  showChatSidebar: boolean;
}

const initialState: initialStateProps = {
  currentActiveChat: null,
  OnlineUsers: [],
  showChatSidebar: false,
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
      console.log("toggelChatSidebar");
      state.showChatSidebar = !state.showChatSidebar;
    },
  },
});
export const {
  setCurrentActiveChat,
  addOnlineUser,
  removeOnlineUser,
  toggelChatSidebar,
} = chatSlice.actions;

export default chatSlice.reducer;
