import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { subscribeMessageDelivered } from '@/shared/socket/listeners/message.listeners';
import { patchMessage } from '@/features/messages/cache';

export const useDeliveredMessages = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = ({ messageId }: { messageId: string }) => {
      patchMessage(queryClient, chatId, messageId, { status: 'delivered' });
    };

    return subscribeMessageDelivered(handler);
  }, [chatId]);
};
