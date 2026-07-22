import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import { MessagesPage, MessageVM } from '@/entities';
import { cleanupOptimisticAttachments } from '../lib/cleanupOptimisticAttachments';

type Old = InfiniteData<MessagesPage>;

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
            msg.id === messageId ? { ...msg, ...patch } : msg,
          ),
        })),
      };
    },
  );
};

export const upsertMessage = (
  queryClient: QueryClient,
  chatId: string,
  message: MessageVM,
) => {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    ['messages', chatId],
    (old) => {
      if (!old) return old;

      let replaced = false;

      const pages = old.pages.map((page, index): MessagesPage => {
        if (index !== 0) return page;

        return {
          ...page,
          messages: page.messages.map((msg) => {
            if (
              message.clientId &&
              msg.clientId &&
              msg.clientId === message.clientId
            ) {
              cleanupOptimisticAttachments(msg.attachments);

              replaced = true;

              return {
                ...message,
                status: 'sent',
              };
            }

            return msg;
          }),
        };
      });

      if (!replaced) {
        pages[0] = {
          ...pages[0],
          messages: [...pages[0].messages, message],
        };
      }

      return {
        ...old,
        pages,
      };
    },
  );
};

export const replaceMessage = (
  queryClient: QueryClient,
  chatId: string,
  message: MessageVM,
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
            msg.id === message.id ? message : msg,
          ),
        })),
      };
    },
  );
};

export const removeMessage = (
  queryClient: QueryClient,
  chatId: string,
  messageId: string,
) => {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    ['messages', chatId],
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          messages: page.messages.filter((msg) => msg.id !== messageId),
        })),
      };
    },
  );
};
