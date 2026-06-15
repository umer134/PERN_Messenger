import { SelectedConversation } from '../../entities/conversation/model/selected-conversation.types';
import { ConversationContent } from './conversation-content/ConversationContent';
import * as s from './conversation-view.css';
import { DraftConversationContent } from './draft-conversation-content/DraftConversationContent';
import { EmptyState } from "./empty-state/EmptyState";

type Props = {
  selectedConversation: SelectedConversation | null;

  onSelectedConversation: (conversation: SelectedConversation) => void;
};

export const ConversationView = ({ selectedConversation, onSelectedConversation}: Props) => {
  
  if(!selectedConversation) return <EmptyState />;

  if(selectedConversation.type === "conversation") {
    return (
      <section className={s.root}>
        <ConversationContent conversation={selectedConversation.data} />
      </section>
    )
  }

  return (
    <section className={s.root}>
      <DraftConversationContent
        user={ selectedConversation.draft.participant }
        onConversationCreated={(data) => onSelectedConversation({
          type: "conversation",
          data: data,
        })}
      />
    </section>
  )
};