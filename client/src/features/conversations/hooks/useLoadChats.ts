import { useQuery } from '@tanstack/react-query';
import { ConversationApi } from '@/entities/conversation';

export const useLoadChats = () =>
  useQuery({
    queryKey: ['conversation', 'list'],
    queryFn: async () => {
      const response = await ConversationApi.leadChats();

      return response.data;
    },
  });
