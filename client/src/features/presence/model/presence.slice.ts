import { createSlice } from '@reduxjs/toolkit';

type PresenceUser = {
  online: boolean;
  lastSeen?: number;
};

type PresenceState = {
  users: Record<string, PresenceUser>;
};

const initialState: PresenceState = {
  users: {},
};

const slice = createSlice({
  name: 'presence',

  initialState,

  reducers: {
    userOnline: (state, action) => {
      state.users[action.payload.userId] = {
        online: true,
      };
    },

    userOffline: (state, action) => {
      state.users[action.payload.userId] = {
        online: false,
        lastSeen: action.payload.lastSeen,
      };
    },

    setOnlineUsers: (state, action) => {
      const users = action.payload;

      users.forEach((userId) => {
        state.users[userId] = {
          online: true,
        };
      });
    },
  },
});

export const { userOnline, userOffline, setOnlineUsers } = slice.actions;

export default slice.reducer;
