import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageAction } from "./message-actions.types";
import { MessageVM } from "../../../entities/messages/model/message.types";

interface MessageActionsState {
  actionType: MessageAction | null;

  message: MessageVM | null;
}

const initialState: MessageActionsState = {
  message: null,
  actionType: null,
};

const messageActions = createSlice({
  name: 'messageActions',
  initialState,
  reducers: {
    startReply: (state, action: PayloadAction<MessageVM>) => {
      state.actionType = "reply";
      state.message = action.payload;
    },

    startEdit: (state, action: PayloadAction<MessageVM>) => {
      state.actionType = "edit";
      state.message = action.payload;
    },

    clearAction: (state) => {
      state.actionType = null;
      state.message = null;
    },
  },
});

export const {startReply, startEdit, clearAction} = messageActions.actions;
export default messageActions.reducer;