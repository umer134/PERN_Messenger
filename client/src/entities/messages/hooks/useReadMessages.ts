import { useMutation } from '@tanstack/react-query';
import { MessageApi } from '../api/message.api';

export const useReadMessages = () => {
  return useMutation({
    mutationFn: async (chatId: string) => {
      return await MessageApi.readMessages(chatId);
    },
  });
};
