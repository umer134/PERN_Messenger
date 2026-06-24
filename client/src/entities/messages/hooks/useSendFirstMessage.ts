import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MessageApi } from '../api/message.api';

import { SendMessageDto } from '../model/send-message.types';
import {
  DirectMessageSendResponse,
  MessageResponse,
} from '../model/message.model';
import { MessageAdapter } from '../model/message.adapter';

export const useSendFirstMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<DirectMessageSendResponse, Error, SendMessageDto>({
    mutationFn: async ({ recipientId, content, files }) => {
      const response = await MessageApi.sendMessage({
        recipientId,
        content,
        files,
      });

      return response.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ['messages', data.chat_id],
        (old: MessageResponse) => {
          return {
            messages: [...(old?.messages ?? []), MessageAdapter.toVM(data)],

            nextCursor: old?.nextCursor ?? null,
          };
        },
      );
    },
  });
};
