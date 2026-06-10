import { RootState } from "../../../app/providers/store";

export const selectCurrentUser = (state: RootState) =>
  state.currentUser;

export const selectCurrentUserId = (state: RootState) =>
  state.currentUser.id;

export const selectCurrentUserName = (state: RootState) =>
  state.currentUser.username;

export const selectCurrentUserAvatar = (state: RootState) =>
  state.currentUser.avatar;