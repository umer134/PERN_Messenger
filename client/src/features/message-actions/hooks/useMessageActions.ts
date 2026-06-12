import { useMutation } from '@tanstack/react-query';
import { MessageActionsApi } from '../api/messageActions.api';
import { MessageEditDto, MessageEditResponse } from '../../../entities/messages/model/message.model';

export const useMessageActions = () => {
  const deleteMessage = () => useMutation({
    mutationFn: async (messageId: string) => {
      const response = await MessageActionsApi.deleteMessage(messageId);

      return response;
    },
  });

  const editMessage = (id: string) => useMutation<MessageEditResponse, Error, MessageEditDto>({
    mutationFn: async (dto) => {
      const response = await MessageActionsApi.editMessage(id, dto);

      return response.data;
    }
  });

  return {
    deleteMessage,
    editMessage,
  };
};