import { MessageResponse } from '@/entities';

type Old = MessageResponse;

export const appendMessage = (queryClient, chatId, message) => {
  queryClient.setQueryData(['messages', chatId], (old: Old) => {
    if (!old) return old;

    return {
      ...old,
      messages: [...old.messages, message],
    };
  });
};

export const markMessageRead = (queryClient, chatId, messageIds) => {
  queryClient.setQueryData(['messages', chatId], (old: Old) => {
    if (!old) return old;

    const updated = {
      ...old,
      messages: old.messages.map((msg) =>
        messageIds.includes(msg.id)
          ? {
              ...msg,
              status: 'read',
              isRead: true,
            }
          : msg,
      ),
    };

    return updated;
  });
};

export const markMessagesDelivered = (queryClient, chatId, messageId) => {
  queryClient.setQueryData(['messages', chatId], (old: Old) => {
    if (!old) return old;

    return {
      ...old,
      messages: old.messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              status: 'delivered',
            }
          : msg,
      ),
    };
  });
};

export const updateMessage = (queryClient, chatId, updated) => {
  queryClient.setQueryData(['messages', chatId], (old: Old) => {
    if (!old) return old;

    return {
      ...old,
      messages: old.messages.map((msg) =>
        msg.id === updated.id ? updated : msg,
      ),
    };
  });
};

export const removeMessage = (queryClient, chatId, messageId) => {
  queryClient.setQueryData(['messages', chatId], (old: Old) => {
    if (!old) return old;

    return {
      ...old,

      messages: old.messages.filter((msg) => msg.id !== messageId),
    };
  });
};
