import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { removeMessage } from '@/features/messages/cache';

import { subscribeMessageDeleted } from '@/shared/socket/listeners/message.listeners';

export const useDeletedMessages = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = ({ messageId }: { messageId: string }) => {
      removeMessage(queryClient, chatId, messageId);
    };

    return subscribeMessageDeleted(handler);
  }, [chatId]);
};
