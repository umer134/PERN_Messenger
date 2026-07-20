import type { QueryClient } from '@tanstack/react-query';
import { MessagesCache } from './types';

export const mutateMessagesCache = (
  queryClient: QueryClient,
  chatId: string,
  updater: (cache: MessagesCache) => MessagesCache,
) => {
  queryClient.setQueryData<MessagesCache>(['messages', chatId], (old) => {
    if (!old) return old;

    return updater(old);
  });
};
