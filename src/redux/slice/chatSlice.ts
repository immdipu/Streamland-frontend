import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatsTypes } from "@/types/chatTypes";

interface initialStateProps {
  currentActiveChat: ChatsTypes | null;
}

const initialState: initialStateProps = {
  currentActiveChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentActiveChat: (state, action: PayloadAction<ChatsTypes>) => {
      state.currentActiveChat = action.payload;
    },
  },
});
export const { setCurrentActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
