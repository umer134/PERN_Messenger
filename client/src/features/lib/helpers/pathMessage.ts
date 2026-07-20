import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import { MessagesPage, MessageVM } from '@/entities';

export const patchMessage = (
  queryClient: QueryClient,
  chatId: string,
  messageId: string,
  patch: Partial<MessageVM>,
) => {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    ['messages', chatId],
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          messages: page.messages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  ...patch,
                }
              : msg,
          ),
        })),
      };
    },
  );
};
