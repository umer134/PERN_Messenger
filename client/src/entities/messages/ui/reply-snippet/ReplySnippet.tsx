import { useAppDispatch } from '@/app/hooks';
import { scrollToMessage } from '@/features/navigation/message-navigation/model/message-navigation.slice';
import { MessageAttachmentVM } from '@/model/message.types';
import * as s from './reply-snippet.css';

type Props = {
  replyMessageId: string;

  sender: string;

  content: string;

  attachments?: MessageAttachmentVM[];

  onClick?: () => void;
};

export const ReplySnippet = ({
  replyMessageId,
  sender,
  content,
  attachments,
  onClick,
}: Props) => {
  const dispatch = useAppDispatch();

  const previewText = (() => {
    if (content?.trim()) {
      return content;
    }

    const attachment = attachments?.[0];

    if (!attachment) {
      return '';
    }

    switch (attachment.type) {
      case 'image':
        return '📷 Photo';

      case 'video':
        return '🎥 Video';

      case 'voice':
        return '🎤 Voice message';

      case 'audio':
        return '🎵 Audio';

      case 'file':
        return `📎 ${attachment.name}`;

      default:
        return '📎 Attachment';
    }
  })();

  return (
    <div
      className={s.root}
      onClick={() => dispatch(scrollToMessage(replyMessageId))}
    >
      <div className={s.author}>{sender}</div>

      <div className={s.content}>{previewText}</div>
    </div>
  );
};
