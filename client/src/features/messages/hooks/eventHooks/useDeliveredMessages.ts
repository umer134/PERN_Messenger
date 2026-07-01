import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { markMessagesDelivered } from '@/features/lib';

import { subscribeMessageDelivered } from '@/shared/socket/listeners/message.listeners';

export const useDeliveredMessages = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = ({ messageId }: { messageId: string }) => {
      markMessagesDelivered(queryClient, chatId, messageId);
    };

    return subscribeMessageDelivered(handler);
  }, [chatId]);
};
