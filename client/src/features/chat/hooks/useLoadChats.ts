import { useQuery } from '@tanstack/react-query';
import { ChatApi } from '@/entities/chat';

export const useLoadChats = () =>
  useQuery({
    queryKey: ['chat', 'list'],
    queryFn: async () => {
      const response = await ChatApi.leadChats();

      return response.data;
    },
  });
