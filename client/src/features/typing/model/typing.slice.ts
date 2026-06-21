import { createSlice } from "@reduxjs/toolkit";

type TypingUser = {
  userId: string;
  username: string;
  lastActivity: number;
};

type State = {
  chats: Record<string, TypingUser[]>;
};

const initialState: State = {
  chats: {},
};

const slice = createSlice({
  name: "typing",

  initialState,

  reducers: {
    addTypingUser: (state, action) => {

      const { chatId, userId, username } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = [];
      }

      const exists = state.chats[chatId].find(u => 
        u.userId === userId
      );

      if(exists) {
        exists.lastActivity = Date.now();
        return;
      }

      state.chats[chatId].push({ userId, username, lastActivity: Date.now() });
    },
    
    removeTypingUser: (state, action) => {
      const { chatId, userId } = action.payload;

      if (!state.chats[chatId]) return;

      state.chats[chatId] = state.chats[chatId].filter(u =>
        u.userId !== userId
      );
    },

    clearTypingUsers: (state, action) => {
      delete state.chats[action.payload];
    },
  },
});

export const {
  addTypingUser,
  removeTypingUser,
  clearTypingUsers,
} = slice.actions;

export default slice.reducer;