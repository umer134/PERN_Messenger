import { RootState } from '@/app/providers/store';

export const selectMessageAction = (state: RootState) =>
  state.messageActions.actionType;

export const selectActiveMessage = (state: RootState) =>
  state.messageActions.message;
