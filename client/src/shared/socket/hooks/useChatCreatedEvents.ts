import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { subscribeChatCreated } from '../listeners/chat.listeners';
import { SelectedConversation } from '../../../entities/conversation/model/selected-conversation.types';

export const useChatCreatedEvents = (
  pendingChatId,
  setPendingChatId,
  setSelectedConversation,
  pendingConversation,
  setPendingConversation,
) => {
  const queryClient = useQueryClient();

  const pendingChatIdRef = useRef(null);

  useEffect(() => {
    pendingChatIdRef.current = pendingChatId;
  }, [pendingChatId]);

  useEffect(() => {
    const handler = (conversation) => {
      console.log('chatCreated', conversation);

      queryClient.setQueryData(['conversations', 'list'], (old: any = []) => {
        if (old.some((c) => c.id === conversation.id)) {
          return old;
        }

        return [conversation, ...old];
      });

      if (pendingChatIdRef.current === conversation.id) {
        setSelectedConversation({
          type: 'conversation',
          data: conversation,
        });

        setPendingChatId(null);
      } else {
        // socket пришёл раньше id
        setPendingConversation(conversation);
      }
    };

    return subscribeChatCreated(handler);
  }, []);

  useEffect(() => {
    if (
      pendingChatId &&
      pendingConversation &&
      pendingChatId === pendingConversation.id
    ) {
      setSelectedConversation({
        type: 'conversation',
        data: pendingConversation,
      });

      setPendingChatId(null);
      setPendingConversation(null);
    }
  }, [pendingChatId, pendingConversation]);
};
