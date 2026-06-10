import { ConversationContent } from './conversation-content/ConversationContent';
import * as s from './conversation-view.css';
import { EmptyState } from "./empty-state/EmptyState";

type Props = {
  selectedConversationId: string | null;
};

export const ConversationView = ({ selectedConversationId }: Props) => {
  
  if(!selectedConversationId) return <EmptyState />;

  return (
    <section className={s.root}>
      <ConversationContent
        conversationId={
          selectedConversationId
        }
      />
    </section>
  )
};