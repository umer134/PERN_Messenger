import { useMutation } from "@tanstack/react-query";
import { MessageApi } from "../api/message.api";

export function useSendMessage() {
  return useMutation({
    mutationFn: async (dto) => {
      const response = await MessageApi.sendMessage(dto);

      return response;
    }
  })
}