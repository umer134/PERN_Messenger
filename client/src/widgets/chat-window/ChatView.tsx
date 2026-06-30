import { SelectedChat } from '@/entities/chat/model';
import { ChatContent } from './chat-content';
import * as s from './chat-view.css';
import { DraftChatContent } from './draft-chat-content';
import { EmptyState } from './empty-state';
import clsx from 'clsx';

type Props = {
  selectedChat: SelectedChat | null;
  onDraftChatCreated: (chatId: string) => void;

  onBack?: () => void;

  mobileView: 'list' | 'chat';
};

export const ChatView = ({
  selectedChat,
  onDraftChatCreated,
  onBack,
  mobileView,
}: Props) => {
  return (
    <section className={clsx(s.root, mobileView === 'list' && s.hiddenMobile)}>
      {!selectedChat ? (
        <EmptyState />
      ) : selectedChat.type === 'chat' ? (
        <ChatContent chat={selectedChat.data} onBack={onBack} />
      ) : (
        <DraftChatContent
          user={selectedChat.draft.participant}
          onChatCreated={onDraftChatCreated}
          onBack={onBack}
        />
      )}
    </section>
  );
};
