import { SelectedConversation } from '@/entities/conversation/model';
import { ConversationContent } from './conversation-content';
import * as s from './conversation-view.css';
import { DraftConversationContent } from './draft-conversation-content';
import { EmptyState } from './empty-state';

type Props = {
  selectedConversation: SelectedConversation | null;

  onDraftChatCreated: (chatId: string) => void;
};

export const ConversationView = ({
  selectedConversation,
  onDraftChatCreated,
}: Props) => {
  if (!selectedConversation) return <EmptyState />;

  if (selectedConversation.type === 'conversation') {
    return (
      <section className={s.root}>
        <ConversationContent conversation={selectedConversation.data} />
      </section>
    );
  }

  return (
    <section className={s.root}>
      <DraftConversationContent
        user={selectedConversation.draft.participant}
        onConversationCreated={onDraftChatCreated}
      />
    </section>
  );
};
