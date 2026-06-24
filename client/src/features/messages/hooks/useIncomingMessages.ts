//message:new
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { MessageAdapter } from '@/entities/messages/model/message.adapter';

import { appendMessage } from '@/features/lib';

import { emitDelivered } from '@/shared/socket/emitters/message.emitters';

import { useReadMessages } from '@/entities/messages/hooks/useReadMessages';

import { useAppSelector } from '@/app/hooks';
import { selectCurrentUserId } from '@/entities/current-user/model/currentUser.selectors';

import { subscribeMessageNew } from '@/shared/socket/listeners/message.listeners';

export const useIncomingMessages = (chatId: string, isAtBottom: boolean) => {
  const queryClient = useQueryClient();

  const currentUserId = useAppSelector(selectCurrentUserId);

  const readMessage = useReadMessages();

  useEffect(() => {
    const handler = (rawMessage: any) => {
      const message = MessageAdapter.toVM(rawMessage);

      appendMessage(queryClient, chatId, message);

      if (message.senderId !== currentUserId && isAtBottom) {
        emitDelivered(message.id, chatId);

        readMessage.mutate(chatId);
      }
    };

    return subscribeMessageNew(handler);
  }, [chatId, isAtBottom, currentUserId]);
};
