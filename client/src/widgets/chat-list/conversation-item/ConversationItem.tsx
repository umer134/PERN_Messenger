import { User, Users } from "lucide-react";

import { ConversationPreview } from "../../../entities/conversation/model/conversation.types";

import * as s from "./conversation-item.css";

type Props = {
  conversation: ConversationPreview;

  selected?: boolean;

  onClick?: () => void;
};

export const ConversationItem = ({
  conversation,
  selected,
  onClick,
}: Props) => {
  return (
    <div
      className={`${s.root} ${selected ? s.selected : ""}`}
      onClick={onClick}
    >
      <div className={s.avatar}>
        {conversation.isGroup ? (
          <Users size={20} />
        ) : (
          <User size={20} />
        )}
      </div>

      <div className={s.content}>
        <div className={s.topRow}>
          <span className={s.title}>
            {conversation.title}
          </span>

          <span className={s.time}>
            {conversation.updatedAt}
          </span>
        </div>

        <div className={s.bottomRow}>
          <span className={s.message}>
            {conversation.lastMessage}
          </span>

          {conversation.unreadCount > 0 && (
            <span className={s.badge}>
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};