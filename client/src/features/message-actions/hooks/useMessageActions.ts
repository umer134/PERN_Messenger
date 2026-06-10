export const useMessageActions = () => {
  const deleteMessage =
    async (
      messageId: string
    ) => {};

  const editMessage =
    async (
      messageId: string,
      text: string
    ) => {};

  const replyToMessage =
    (
      messageId: string
    ) => {};

  return {
    deleteMessage,
    editMessage,
    replyToMessage,
  };
};