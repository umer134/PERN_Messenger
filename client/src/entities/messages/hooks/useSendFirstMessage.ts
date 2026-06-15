import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MessageApi } from "../../../entities/messages/api/message.api";
import { SendMessageDto } from "../model/send-message.types";
import { DirectMessageSendResponse } from "../model/message.model";



export const useSendFirstMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<DirectMessageSendResponse, Error, SendMessageDto>({
    mutationFn: async ({ recipientId, content, files, }) => {
      const response =
        await MessageApi.sendMessage({
          recipientId,
          content,
          files,
        });

      return response.data;
    },

    onSuccess: (data) => {
      const { conversation, message } = data;

      queryClient.setQueryData(
        ["messages", conversation.id],
        (old: any[] = []) => [...old, message]
      );

      queryClient.invalidateQueries({
        queryKey: ['conversations', 'list']
      });
    }
  });
};