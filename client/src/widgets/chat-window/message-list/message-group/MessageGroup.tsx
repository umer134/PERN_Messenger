import { MessageGroupVM } from '@/entities/messages/model/message.types';
import { MediaItem } from '@/features/media-viewer/model/media-viewer.types';
import { MessageBubble } from '@/widgets/chat-window/message-bubble';
import React from 'react';

type Props = {
  group: MessageGroupVM;
  isMine: boolean;
  mediaItems: MediaItem[];
};

export const MessageGroup = React.memo(
  ({ group, isMine, mediaItems }: Props) => {
    return (
      <div>
        {group.messages.map((msg) => (
          <div key={msg.id} id={`message-${msg.id}`}>
            <MessageBubble
              message={msg}
              isGrouped
              isMine={isMine}
              mediaItems={mediaItems}
            />
          </div>
        ))}
      </div>
    );
  },
);
