import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';

import * as s from './MainPage.css';
import { ChatList } from '@/widgets/chat-list/ChatList';
import { ChatView } from '@/widgets/chat-window/ChatView';
import { SelectedChat } from '@/entities/chat/model/selected-chat.types';
import { useTypingEvents } from '@/features/typing/hooks/useTypingEvents';
import { useTypingCleanup } from '@/features/typing/hooks/useTypingCleanup';
import { usePresenceEvents } from '@/features/presence/hooks/usePresenceEvents';
import { useChatCreatedEvents } from '@/shared/socket/hooks/useChatCreatedEvents';
import { ChatPreview } from '@/entities/chat';

const MainPage = () => {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [pendingChat, setPendingChat] = useState<ChatPreview | null>(null);
  const [pendingChatId, setPendingChatId] = useState<string | null>(null);
  const { id } = useAppSelector((state) => state.currentUser);

  usePresenceEvents();
  useTypingEvents();
  useTypingCleanup();

  useChatCreatedEvents(
    setPendingChatId,
    setSelectedChat,
    pendingChat,
    setPendingChat,
    pendingChatId,
  );

  if (!id) return <div>Loading...</div>;

  return (
    <div className={s.root}>
      <ChatList selectedChat={selectedChat} onSelectedChat={setSelectedChat} />
      <ChatView
        selectedChat={selectedChat}
        onDraftChatCreated={setPendingChatId}
      />
    </div>
  );
};

export default MainPage;
