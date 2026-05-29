
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AuthMeResponse }
from './auth.model';

type AuthState = {
  me: AuthMeResponse | null;
  isAuth: boolean;
};

const initialState:
  AuthState = {
    me: null,
    isAuth: false,
  };

const authSlice =
  createSlice({
    name: 'auth',

    initialState,

    reducers: {
      setSession(
        state,
        action:
          PayloadAction<AuthMeResponse>
      ) {
        state.me =
          action.payload;

        state.isAuth =
          true;
      },

      clearSession(
        state
      ) {
        state.me =
          null;

        state.isAuth =
          false;
      },
    },
  });

export const {
  setSession,
  clearSession,
} =
  authSlice.actions;

export default
  authSlice.reducer;