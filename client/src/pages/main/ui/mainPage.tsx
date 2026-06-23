import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';

import * as s from './MainPage.css';
import { ConversationList } from '../../../widgets/chat-list/ChatList';
import { ConversationView } from '../../../widgets/chat-window/ConversationView';
import { SelectedConversation } from '../../../entities/conversation/model/selected-conversation.types';
import { useTypingEvents } from '../../../features/typing/hooks/useTypingEvents';
import { useTypingCleanup } from '../../../features/typing/hooks/useTypingCleanup';
import { usePresenceEvents } from '../../../features/presence/hooks/usePresenceEvents';
import { useChatCreatedEvents } from '../../../shared/socket/hooks/useChatCreatedEvents';

const MainPage = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<SelectedConversation | null>(null);
  const [pendingConversation, setPendingConversation] = useState<any>(null);
  const [pendingChatId, setPendingChatId] = useState<string | null>(null);
  const { id } = useAppSelector((state) => state.currentUser);

  usePresenceEvents();
  useTypingEvents();
  useTypingCleanup();

  useChatCreatedEvents(
    pendingChatId,
    setPendingChatId,
    setSelectedConversation,
    pendingConversation,
    setPendingConversation,
  );

  if (!id) return <div>Loading...</div>;

  return (
    <div className={s.root}>
      <ConversationList
        selectedConversation={selectedConversation}
        onSelectedConversation={setSelectedConversation}
      />
      <ConversationView
        selectedConversation={selectedConversation}
        onDraftChatCreated={setPendingChatId}
      />
    </div>
  );
};

export default MainPage;
