import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageActionsApi } from '../api/messageActions.api';
import { MessageEditDto, MessageEditResponse } from '../../../entities/messages/model/message.model';

export const useDeleteMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => {
      return MessageActionsApi.deleteMessage(messageId);
    },
    onMutate: async(messageId) => {
      await queryClient.cancelQueries({queryKey: ["messages", chatId]});
      
      const prev = queryClient.getQueryData(["messages", chatId]);

      queryClient.setQueryData(["messages", chatId], (old: any) => {
        if(!old) return old;

        return { ...old, messages: old.messages.filter((m: any)=> m.id !== messageId),};
      });

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(["messages", chatId], ctx?.prev);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["messages", chatId]});
    },
  });
};

export const useEditMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, dto}: {id: string, dto: MessageEditDto}) => {
      return MessageActionsApi.editMessage(id, dto);
    },
    onMutate: async({ id, dto }) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", chatId],
      });

      const prev = queryClient.getQueryData(["messages", chatId,]);
      queryClient.setQueryData(["messages", chatId], (old: any) => {
        if (!old) return old;

        return {
          ...old, messages: old.messages.map(
            (msg: any) => 
              msg.id === id
                ? {
                    ...msg,
                    content: dto.newContent,
                }
                :msg
          ),
        };
      });

      return { prev };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["messages", chatId],
        context?.prev
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", chatId],
      });
    },
  });
};