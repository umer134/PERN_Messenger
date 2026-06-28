import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import socket from '@/shared/socket/socket';

export const useChatEvents = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = ({ chatId }: { chatId: string }) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'list'],
      });
    };

    socket.on('chat:updated', handler);

    return () => {
      socket.off('chat:updated', handler);
    };
  }, [queryClient]);
};
