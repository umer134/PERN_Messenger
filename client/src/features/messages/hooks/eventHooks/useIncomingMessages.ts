//message:new
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { MessageAdapter } from '@/entities/messages/model';

import { upsertMessage } from '@/features/lib';

import { emitDelivered } from '@/shared/socket/emitters';

import { useReadMessages } from '@/features/messages/hooks/crudHooks';

import { useAppSelector } from '@/app/hooks';
import { selectCurrentUserId } from '@/entities/current-user/model';

import { subscribeMessageNew } from '@/shared/socket/listeners';
import { MessageResponseModel } from '@/entities';

export const useIncomingMessages = (chatId: string, isAtBottom: boolean) => {
  const queryClient = useQueryClient();

  const currentUserId = useAppSelector(selectCurrentUserId);

  const readMessage = useReadMessages();

  useEffect(() => {
    const handler = (rawMessage: MessageResponseModel) => {
      console.log(rawMessage);

      const message = MessageAdapter.toVM(rawMessage);

      upsertMessage(queryClient, chatId, message);

      if (message.senderId !== currentUserId && isAtBottom) {
        emitDelivered(message.id, chatId);

        readMessage.mutate(chatId);
      }
    };

    return subscribeMessageNew(handler);
  }, [chatId, isAtBottom, currentUserId]);
};
