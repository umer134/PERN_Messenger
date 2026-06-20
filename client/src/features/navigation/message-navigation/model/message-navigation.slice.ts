import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  targetMessageId: string | null;
};

const initialState: State = {
  targetMessageId: null,
};

const slice = createSlice({
  name: "messageNavigation",

  initialState,

  reducers: {
    scrollToMessage: (state, action: PayloadAction<string>) => {
      state.targetMessageId =
        action.payload;
    },

    clearScrollTarget: (state) => {
      state.targetMessageId = null;
    },
  },
});

export const { scrollToMessage, clearScrollTarget, } = slice.actions;

export default slice.reducer;