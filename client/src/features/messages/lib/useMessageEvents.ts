import { useIncomingMessages } from '../hooks/eventHooks/useIncomingMessages';

import { useReadMessagesEvents } from '../hooks/eventHooks/useReadMessageEvents';

import { useDeliveredMessages } from '../hooks/eventHooks/useDeliveredMessages';

import { useEditedMessages } from '../hooks/eventHooks/useEditedMessages';

import { useDeletedMessages } from '../hooks/eventHooks/useDeletedMessages';

export const useMessageEvents = (chatId: string, isAtBottom: boolean) => {
  useIncomingMessages(chatId, isAtBottom);

  useReadMessagesEvents(chatId);

  useDeliveredMessages(chatId);

  useEditedMessages(chatId);

  useDeletedMessages(chatId);
};
