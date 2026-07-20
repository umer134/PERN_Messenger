import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { subscribeMessageRead } from '@/shared/socket/listeners/message.listeners';
import { patchMessage } from '@/features/messages/cache';

export const useReadMessagesEvents = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = ({ messageIds }: { messageIds: string[] }) => {
      messageIds.forEach((id) =>
        patchMessage(queryClient, chatId, id, { status: 'read', isRead: true }),
      );
    };

    return subscribeMessageRead(handler);
  }, [chatId]);
};
