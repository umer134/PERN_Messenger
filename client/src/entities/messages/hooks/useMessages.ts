import { useQuery } from '@tanstack/react-query';
import { MessageApi } from '../api/message.api';
import { MessageAdapter } from '../model/message.adapter';

export const useMessages = (chatId: string) => {
  return useQuery({
    queryKey: ['messages', chatId],

    queryFn: async () => {
      const response = await MessageApi.getMessages(chatId);

      return {
        messages: response.data.messages.map((message) =>
          MessageAdapter.toVM(message),
        ),

        nextCursor: response.data.nextCursor,
      };
    },

    enabled: !!chatId,

    staleTime: 1000 * 60 * 5,
  });
};
