import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageActionsApi } from '../api/messageActions.api';
import {
  MessageEditDto,
  MessageResponse,
} from '@/entities/messages/model/message.model';
import { patchMessage } from '@/features/lib/helpers/pathMessage';
import { removeMessage } from '@/features/lib';

type Old = MessageResponse;

export const useDeleteMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => {
      return MessageActionsApi.deleteMessage(messageId);
    },
    onMutate: async (messageId) => {
      await queryClient.cancelQueries({ queryKey: ['messages', chatId] });

      const prev = queryClient.getQueryData(['messages', chatId]);

      removeMessage(queryClient, chatId, messageId);

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(['messages', chatId], ctx?.prev);
    },
  });
};

export const useEditMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: MessageEditDto }) => {
      return MessageActionsApi.editMessage(id, dto);
    },
    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({
        queryKey: ['messages', chatId],
      });

      const prev = queryClient.getQueryData(['messages', chatId]);
      patchMessage(queryClient, chatId, id, {
        content: dto.newContent,
      });

      return { prev };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['messages', chatId], context?.prev);
    },
  });
};
