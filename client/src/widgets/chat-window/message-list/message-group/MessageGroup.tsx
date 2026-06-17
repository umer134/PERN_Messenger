import { MessageGroupVM } from "../../../../entities/messages/model/message.types";
import { MediaItem } from "../../../../features/media-viewer/model/media-viewer.types";
import { useMessageVisibility } from "../../../../features/messages/lib/useMessageVisibility";
import { MessageBubble } from "../../message-bubble/MessageBubble";

type Props = {
  group: MessageGroupVM;
  isMine: boolean;
  mediaItems: MediaItem[];
  onVisible: () => void;
};

export const MessageGroup = ({
  group,
  isMine,
  mediaItems,
  onVisible,
}: Props) => {

  const ref = useMessageVisibility(onVisible);

  return (
    <div ref={ref}>
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