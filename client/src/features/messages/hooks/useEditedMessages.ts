import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { MessageAdapter } from '@/entities/messages/model';

import { updateMessage } from '@/features/lib';

import { subscribeMessageEdited } from '@/shared/socket/listeners/message.listeners';

export const useEditedMessages = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (rawMessage: any) => {
      const message = MessageAdapter.toVM(rawMessage);

      updateMessage(queryClient, chatId, message);
    };

    return subscribeMessageEdited(handler);
  }, [chatId]);
};
