import { MessageGroupVM } from "../../../../entities/messages/model/message.types";
import { MediaItem } from "../../../../features/media-viewer/model/media-viewer.types";
import { MessageBubble } from "../../message-bubble/MessageBubble";

type Props = {
  group: MessageGroupVM;
  isMine: boolean;
  mediaItems: MediaItem[];
};

export const MessageGroup = ({
  group,
  isMine,
  mediaItems
}: Props) => {
  return (
    <div>
      {group.messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isGrouped
          isMine={isMine}
          mediaItems={mediaItems}
        />
      ))}
    </div>
  );
};