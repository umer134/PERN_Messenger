import { useQuery } from '@tanstack/react-query';
import { ConversationApi } from '../api/conversation.api';

export const useLoadChats = () =>
  useQuery({
    queryKey: ['conversation', 'list'],
    queryFn: async () => {
      const response = await ConversationApi.leadChats();

      return response.data;
    },
  });
