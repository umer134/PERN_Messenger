import * as s from "./conversation-items.css";
import { ConversationPreview } from "../../../entities/conversation/model/conversation.types";
import { ConversationItem } from "../conversation-item/ConversationItem";

type Props = {
  conversations: ConversationPreview[];

  selectedConversationId: string | null;

  onSelect: (id: string) => void;
};

export const ConversationItems = ({
  conversations,
  selectedConversationId,
  onSelect,
}: Props) => {
  return (
    <div className={s.root}>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          selected={
            selectedConversationId === conversation.id
          }
          onClick={() => onSelect(conversation.id)}
        />
      ))}
    </div>
  );
};