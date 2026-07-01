import { RootState } from '@/app/providers/store';

export const selectTargetMessageId = (state: RootState) =>
  state.messageNavigation.targetMessageId;
