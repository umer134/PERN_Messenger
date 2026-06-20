import { User, Users } from "lucide-react";

import { ConversationPreview } from "../../../entities/conversation/model/conversation.types";

import * as s from "./conversation-item.css";
import { useMediaViewer } from "../../../features/media-viewer/lib/useMediaViewer";
import { Avatar } from "../../../shared/ui/Avatar";
import { resolveMediaUrl } from "../../../shared/lib/media/resolveMediaUrl";
import { formatDate } from "../../../shared/lib/format/formatDate";

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

  const { open } = useMediaViewer();

  return (
    <div
      className={`${s.root} ${selected ? s.selected : ""}`}
      onClick={onClick}
    >
      {conversation.avatar ? (
        <Avatar
          src={conversation.avatar}
          alt={conversation.title}
          status={conversation.isOnline ? "online" : "offline"}
          onClick={(e) => {
            e.stopPropagation();
            
            if(!conversation.avatar) return;

            open(
              [
                {
                  id: conversation.id,
                  type: "image",
                  url: resolveMediaUrl(conversation.avatar),
                  name: conversation.title,
                }
              ], 0
            );
          }}
        />
      ) : (
        <div className={s.avatar}>
          {conversation.isGroup ? (
            <Users size={20} />
          ) : (
            <User size={20} />
          )}
        </div>
      )}

      <div className={s.content}>
        <div className={s.topRow}>
          <span className={s.title}>
            {conversation.title}
          </span>

          <span className={s.time}>
            {formatDate(conversation.updatedAt, { format: "smart"})}
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