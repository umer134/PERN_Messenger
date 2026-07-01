import React, { useEffect, useRef, useState } from 'react';

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
import { useDeleteMessage } from '@/features/message-actions/hooks/useMessageActions';
import { useLocalizedDateFormatter } from '@/shared/i18n/hooks/useLocalizedDateFormatter';

type Props = {
  message: MessageVM;
  isGrouped?: boolean;
  isMine?: boolean;
  mediaItems: MediaItem[];
};

const MENU_WIDTH = 180;
const MENU_HEIGHT = 160;

export const MessageBubble = React.memo(
  ({ message, isGrouped, isMine, mediaItems }: Props) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const formatDate = useLocalizedDateFormatter();

    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

    const deleteMessage = useDeleteMessage(message.chatId);

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!menu) return;

      const handleClick = (e: MouseEvent) => {
        if (menuRef.current?.contains(e.target as Node)) return;

        setMenu(null);
      };

      window.addEventListener('mousedown', handleClick);

      return () => {
        window.removeEventListener('mousedown', handleClick);
      };
    }, [menu]);
    useEffect(() => {
      if (!menu) return;

      const handleScroll = () => {
        setMenu(null);
      };

      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }, [menu]);

    useEffect(() => {
      if (!menu) return;

      const close = () => setMenu(null);

      window.addEventListener('resize', close);

      return () => {
        window.removeEventListener('resize', close);
      };
    }, [menu]);

    return (
      <div className={clsx(s.row, isMine && s.mine)}>
        <div
          className={clsx(s.bubble, isMine && s.myBubble)}
          onContextMenu={(e) => {
            e.preventDefault();

            const rect = e.currentTarget.getBoundingClientRect();

            let x = rect.right + 8;

            if (x + MENU_WIDTH > window.innerWidth) {
              x = rect.left - MENU_WIDTH - 8;
            }

            // если даже слева не влазит — поверх сообщения
            if (x < 8) {
              x = rect.left + rect.width / 2 - MENU_WIDTH / 2;
            }

            let y = rect.top;

            // если снизу не влазит
            if (y + MENU_HEIGHT > window.innerHeight) {
              y = window.innerHeight - MENU_HEIGHT - 8;
            }

            setMenu({
              x,
              y,
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
        </div>
        {menu && (
          <div
            ref={menuRef}
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
    );
  },
);
