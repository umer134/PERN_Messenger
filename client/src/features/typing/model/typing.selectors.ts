import { RootState } from '../../../app/providers/store';

export const selectTypingUsers = (chatId: string) => (state: RootState) =>
  state.typing.chats[chatId] ?? [];
