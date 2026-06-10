import { User, Users } from "lucide-react";

import * as s from "./conversation-header.css";

import { ConversationDetails } from "../../../entities/conversation/model/conversation-details.types";
 
type Props = {
  conversation: ConversationDetails;
};

export const ConversationHeader = ({
  conversation,
}: Props) => {
  return (
    <header className={s.root}>
      <div className={s.avatar}>
        {conversation?.isGroup ? (
          <Users size={18} />
        ) : (
          <User size={18} />
        )}
      </div>

      <div className={s.info}>
        <span className={s.title}>
          {conversation?.title}
        </span>

        <span className={s.meta}>
          {conversation?.isGroup
            ? `${conversation?.membersCount} participants`
            : conversation?.isOnline
            ? "online"
            : "offline"}
        </span>
      </div>
    </header>
  );
};