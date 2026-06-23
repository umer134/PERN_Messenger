import { RootState } from '../../../app/providers/store';

export const selectPresence = (userId: string) => (state: RootState) =>
  state.presence.users[userId];
