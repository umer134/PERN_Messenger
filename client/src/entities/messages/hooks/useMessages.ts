import { useQuery } from "@tanstack/react-query";
import { MessageApi } from "../api/message.api";
import { MessageAdapter } from "../model/message.adapter";

export const useMessages = (
  chatId: string
) => {
  return useQuery({
    queryKey: ["messages", chatId],

    queryFn: async () => {
      const response =
        await MessageApi.getMessages(chatId);

      const mapped = response.data.messages.map(
          MessageAdapter.toVM
        )
      
      return {
        messages: response.data.messages.map(
          MessageAdapter.toVM
        ),

        nextCursor: response.data.nextCursor,
      }
    },

    enabled: !!chatId,
  });
};