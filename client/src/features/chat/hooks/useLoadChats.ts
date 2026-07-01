import { useQuery } from '@tanstack/react-query';
import { ChatApi } from '@/entities/chat';

export const useLoadChats = () =>
  useQuery({
    queryKey: ['chat', 'list'],
    queryFn: async () => {
      const response = await ChatApi.leadChats();

      return response.data;
    },
    select: (chats) =>
      [...chats].sort(
        (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
      ),
  });
