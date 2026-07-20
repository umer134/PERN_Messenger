import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  MessageAdapter,
  MessageResponseModel,
} from '@/entities/messages/model';

import { replaceMessage } from '@/features/lib';

import { subscribeMessageEdited } from '@/shared/socket/listeners/message.listeners';

export const useEditedMessages = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (rawMessage: MessageResponseModel) => {
      const message = MessageAdapter.toVM(rawMessage);

      replaceMessage(queryClient, chatId, message);
    };

    return subscribeMessageEdited(handler);
  }, [chatId]);
};
