import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MessageApi } from '@/entities/messages/api';

import { SendMessageDto } from '@/entities/messages/model';
import {
  DirectMessageSendResponse,
  MessageResponse,
} from '@/entities/messages/model';
import { MessageAdapter } from '@/entities/messages/model';

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
