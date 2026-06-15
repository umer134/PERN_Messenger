import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageApi } from "../api/message.api";
import { SendMessageDto } from "../model/send-message.types";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUser, selectCurrentUserId } from "../../current-user/model/currentUser.selectors";

export function useSendMessage(chatId: string) {
  const queryClient = useQueryClient();

  const id = useAppSelector(selectCurrentUserId);

  return useMutation({
    mutationFn: MessageApi.sendMessage,

  onMutate: async (dto) => {
    await queryClient.cancelQueries({
      queryKey: ["messages", chatId],
    });

    const prev = queryClient.getQueryData(["messages", chatId]);

    const optimisticMessage = {
      id: crypto.randomUUID(),
      chatId,
      senderId: id,
      content: dto.content ?? null,
      attachments: [],
      replyTo: null,
      sentAt: new Date().toISOString(),
      isRead: false,
      status: "sending",
    };

    queryClient.setQueryData(
      ["messages", chatId],
      (old: any = { messages: [] }) => {
        return {
          ...old,
          messages: [...(old?.messages ?? []), optimisticMessage],
        };
      }
    );

    return { prev };
  },

    onError: (_err, _dto, context) => {
      queryClient.setQueryData(
        ["messages", chatId],
        context?.prev
      );
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", chatId],
      });
    },
  });
}