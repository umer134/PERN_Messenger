import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageApi } from '@/entities/messages/api/message.api';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUserId } from '@/entities/current-user/model/currentUser.selectors';

import { InfiniteData } from '@tanstack/react-query';
import { MessagesPage } from '@/entities/messages/model';

export function useSendMessage(chatId: string) {
  const queryClient = useQueryClient();

  const id = useAppSelector(selectCurrentUserId);

  return useMutation({
    mutationFn: MessageApi.sendMessage,

    onMutate: async (dto) => {
      await queryClient.cancelQueries({
        queryKey: ['messages', chatId],
      });

      const previousMessages = queryClient.getQueryData<
        InfiniteData<MessagesPage>
      >(['messages', chatId]);

      const optimisticMessage = {
        id: dto.clientId,

        clientId: dto.clientId,

        chatId,

        senderId: id,

        content: dto.content ?? null,

        attachments: [],

        replyTo: null,

        sentAt: new Date().toISOString(),

        isRead: false,

        status: 'sending',
      };

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

    onError: (_err, _dto, context) => {
      queryClient.setQueryData(['messages', chatId], context?.previousMessages);
    },
  });
}
