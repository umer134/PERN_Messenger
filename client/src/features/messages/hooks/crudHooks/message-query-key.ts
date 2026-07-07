export const getMessageQueryKey = (chatId?: string) => {
  return ['messages', chatId ?? 'temp'] as const;
};
