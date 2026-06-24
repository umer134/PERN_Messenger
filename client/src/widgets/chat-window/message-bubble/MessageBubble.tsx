import { useEffect, useState } from 'react';
import { MessageContextMenu } from '@/features/message-actions/ui/MessageContextMenu';

import { useAppDispatch } from '@/app/hooks';
import {
  startReply,
  startEdit,
  startDelete,
} from '@/features/message-actions/model/message-actions.slice';

import clsx from 'clsx';

import * as s from './message-bubble.css';

import { MessageVM } from '@/entities/messages/model/message.types';
import { MessageStatus } from '@/entities/messages/ui/message-status/MessageStatus';
import { AttachmentRenderer } from '@/entities/messages/ui/attachment-renderer/AttachmentRenderer';
import { MediaItem } from '@/features/media-viewer/model/media-viewer.types';
import { ReplySnippet } from '@/entities/messages/ui/reply-snippet/ReplySnippet';
import { formatDate } from '@/shared/lib/format/formatDate';
import { useDeleteMessage } from '@/features/message-actions/hooks/useMessageActions';

type Props = {
  message: MessageVM;
  isGrouped?: boolean;
  isMine?: boolean;
  mediaItems: MediaItem[];
};

export const MessageBubble = ({
  message,
  isGrouped,
  isMine,
  mediaItems,
}: Props) => {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const deleteMessage = useDeleteMessage(message.chatId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!menu) return;

    const handleClick = () => {
      setMenu(null);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [menu]);

  return (
    <div className={clsx(s.row, isMine && s.mine)}>
      <div
        className={clsx(s.bubble, isMine && s.myBubble)}
        onContextMenu={(e) => {
          e.preventDefault();

          setMenu({
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        {message.replyTo && (
          <ReplySnippet
            replyMessageId={message.replyTo?.id}
            sender={message.replyTo?.senderName ?? 'Unknown'}
            content={message.replyTo.content ?? ''}
            attachments={message.replyTo.attachments}
          />
        )}

        {message.attachments.length > 0 && (
          <div className={s.attachments}>
            {message.attachments.map((attachment) => (
              <AttachmentRenderer
                key={attachment.id}
                attachment={attachment}
                mediaItems={mediaItems}
              />
            ))}
          </div>
        )}

        {message.content && <div className={s.text}>{message.content}</div>}

        <div className={s.footer}>
          <span>{formatDate(message.sentAt, { format: 'time' })}</span>
          {message.status && isMine && (
            <MessageStatus status={message.status} />
          )}
        </div>

        {menu && (
          <div
            style={{
              position: 'fixed',
              left: menu.x,
              top: menu.y,
              zIndex: 9999,
            }}
          >
            <MessageContextMenu
              canEdit={!!isMine}
              onAction={(action) => {
                switch (action) {
                  case 'reply':
                    dispatch(startReply(message));
                    break;

                  case 'edit':
                    dispatch(startEdit(message));
                    break;

                  case 'delete':
                    deleteMessage.mutateAsync(message.id);
                    break;

                  case 'copy':
                    break;
                }

                setMenu(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
