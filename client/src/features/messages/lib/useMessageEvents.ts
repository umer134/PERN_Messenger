import { useIncomingMessages } from "../hooks/useIncomingMessages";

import { useReadMessagesEvents } from "../hooks/useReadMessageEvents";

import { useDeliveredMessages } from "../hooks/useDeliveredMessages";

import { useEditedMessages } from "../hooks/useEditedMessages";

import { useDeletedMessages } from "../hooks/useDeletedMessages";

export const useMessageEvents = (chatId: string, isAtBottom: boolean,) => {
  useIncomingMessages(chatId, isAtBottom);

  useReadMessagesEvents(chatId);

  useDeliveredMessages(chatId);

  useEditedMessages(chatId);

  useDeletedMessages(chatId);
};