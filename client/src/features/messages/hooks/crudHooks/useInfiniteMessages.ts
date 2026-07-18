import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { MessageApi } from '@/entities/messages/api';
import { MessageAdapter, MessagesPage } from '@/entities/messages/model';

export const useInfiniteMessages = (chatId: string) => {
  return useInfiniteQuery<
    MessagesPage,
    Error,
    InfiniteData<MessagesPage>,
    string[],
    string | undefined
  >({
    queryKey: ['messages', chatId],

    initialPageParam: undefined,

    queryFn: async ({ pageParam }) => {
      const response = await MessageApi.getMessages(chatId, pageParam);

      return {
        messages: response.data.messages.map(MessageAdapter.toVM),
        previousCursor: response.data.previousCursor,
      };
    },

    getNextPageParam: (lastPage) => {
      return lastPage.previousCursor ?? undefined;
    },

    enabled: !!chatId,
  });
};
