import { SelectedChat } from '@/entities/chat/model';
import { ChatContent } from './chat-content';
import * as s from './chat-view.css';
import { DraftChatContent } from './draft-chat-content';
import { EmptyState } from './empty-state';

type Props = {
  selectedChat: SelectedChat | null;

  onDraftChatCreated: (chatId: string) => void;
};

export const ChatView = ({ selectedChat, onDraftChatCreated }: Props) => {
  if (!selectedChat) return <EmptyState />;

  if (selectedChat.type === 'chat') {
    return (
      <section className={s.root}>
        <ChatContent chat={selectedChat.data} />
      </section>
    );
  }

  return (
    <section className={s.root}>
      <DraftChatContent
        user={selectedChat.draft.participant}
        onChatCreated={onDraftChatCreated}
      />
    </section>
  );
};
