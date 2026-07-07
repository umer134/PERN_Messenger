import { useState } from 'react';

import * as s from './mainPage.css';
import { ChatList } from '@/widgets/chat-list/ChatList';
import { ChatView } from '@/widgets/chat-window/ChatView';
import { SelectedChat } from '@/entities/chat/model/selected-chat.types';
import { useTypingEvents } from '@/features/typing/hooks/useTypingEvents';
import { useTypingCleanup } from '@/features/typing/hooks/useTypingCleanup';
import { usePresenceEvents } from '@/features/presence/hooks/usePresenceEvents';
import { useChatCreatedEvents } from '@/shared/socket/hooks/useChatCreatedEvents';
import { ChatPreview } from '@/entities/chat';

type MobileView = 'list' | 'chat';

const MainPage = () => {
  const [mobileView, setMobileView] = useState<MobileView>('list');
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [pendingChat, setPendingChat] = useState<ChatPreview | null>(null);
  const [pendingChatId, setPendingChatId] = useState<string | null>(null);

  const handleSelectChat = (chat: SelectedChat) => {
    setSelectedChat(chat);

    setMobileView('chat');
  };

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

  return (
    <div className={s.root}>
      <ChatList
        selectedChat={selectedChat}
        onSelectedChat={handleSelectChat}
        mobileView={mobileView}
      />
      <ChatView
        selectedChat={selectedChat}
        onBack={() => setMobileView('list')}
        mobileView={mobileView}
        onDraftChatCreated={setPendingChatId}
      />
    </div>
  );
};

export default MainPage;
