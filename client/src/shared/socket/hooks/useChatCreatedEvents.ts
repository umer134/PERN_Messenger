import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { subscribeChatCreated } from '../listeners/chat.listeners';
import { ChatPreview, ChatResponse, SelectedChat } from '@/entities';

export const useChatCreatedEvents = (
  setPendingChatId: Dispatch<SetStateAction<string | null>>,
  setSelectedChat: Dispatch<SetStateAction<SelectedChat | null>>,
  pendingChat: ChatPreview | null,
  setPendingChat: Dispatch<SetStateAction<ChatPreview | null>>,
  pendingChatId?: string | null,
) => {
  const queryClient = useQueryClient();

  const pendingChatIdRef = useRef<string | null | undefined>(null);

  useEffect(() => {
    pendingChatIdRef.current = pendingChatId;
  }, [pendingChatId]);

  useEffect(() => {
    const handler = (chat: ChatPreview) => {
      console.log('chatCreated', chat);

      queryClient.setQueryData(['chat', 'list'], (old: ChatPreview[] = []) => {
        if (old.some((c) => c.id === chat.id)) {
          return old;
        }

        return [chat, ...old];
      });

      if (pendingChatIdRef.current === chat.id) {
        setSelectedChat({
          type: 'chat',
          data: chat,
        });

        setPendingChatId(null);
      } else {
        setPendingChat(chat);
      }
    };

    return subscribeChatCreated(handler);
  }, []);

  useEffect(() => {
    if (pendingChatId && pendingChat && pendingChatId === pendingChat.id) {
      setSelectedChat({
        type: 'chat',
        data: pendingChat,
      });

      setPendingChatId(null);
      setPendingChat(null);
    }
  }, [pendingChatId, pendingChat]);
};
