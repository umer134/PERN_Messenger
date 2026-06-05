import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrentUserState = {
  id: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null | undefined;
  role: "user" | "admin" | "moderator" | null;
  isHydrated: boolean;
};

const initialState: CurrentUserState = {
  id: null,
  username: null,
  email: null,
  avatar: null,
  role: null,
  isHydrated: false,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,

  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<Partial<CurrentUserState>>
    ) => {
      Object.assign(state, action.payload);
    },

    hydrateCurrentUser: (
      state,
      action: PayloadAction<Omit<CurrentUserState, "isHydrated">>
    ) => {
      Object.assign(state, action.payload);
      state.isHydrated = true;
    },

    clearCurrentUser: () => ({
      ...initialState,
    }),
  },
});

export const {
  setCurrentUser,
  clearCurrentUser,
  hydrateCurrentUser,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;