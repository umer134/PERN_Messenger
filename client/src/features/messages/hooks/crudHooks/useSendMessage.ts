import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageApi } from '@/entities/messages/api/message.api';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/entities/current-user/model/';

import { InfiniteData } from '@tanstack/react-query';
import { MessageAdapter, MessagesPage } from '@/entities/messages/model';
import { createOptimisticMessage } from '../../lib/createOptimisticMessage';
import { upsertMessage } from '../../cache';

export function useSendMessage(chatId?: string) {
  const queryClient = useQueryClient();

  const { id, username } = useAppSelector(selectCurrentUser);

  return useMutation({
    mutationFn: MessageApi.sendMessage,

    onMutate: async (dto) => {
      if (!chatId) return;

      await queryClient.cancelQueries({
        queryKey: ['messages', chatId],
      });

      const previousMessages = queryClient.getQueryData<
        InfiniteData<MessagesPage>
      >(['messages', chatId]);

      const optimisticMessage = createOptimisticMessage(
        dto,
        chatId,
        id!,
        username!,
        dto.replyMessage,
      );

      queryClient.setQueryData<InfiniteData<MessagesPage>>(
        ['messages', chatId],
        (old) => {
          if (!old) return old;

          return {
            ...old,

            pages: old.pages.map((page, index) => {
              if (index !== 0) return page;

              return {
                ...page,

                messages: [...page.messages, optimisticMessage],
              };
            }),
          };
        },
      );

      return {
        previousMessages,
      };
    },

    onSuccess: (response, dto) => {
      if (!chatId) return;

      const message = MessageAdapter.toVM(response.data);

      upsertMessage(queryClient, chatId, message);
    },

    onError: (_err, _dto, context) => {
      if (!chatId || !context?.previousMessages) return;

      queryClient.setQueryData(['messages', chatId], context.previousMessages);
    },
  });
}
