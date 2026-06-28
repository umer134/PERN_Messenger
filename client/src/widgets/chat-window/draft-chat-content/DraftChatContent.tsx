import { useSendFirstMessage } from '@/features/messages/hooks/crudHooks/useSendFirstMessage';
import { UserPreview } from '@/entities/user/model/user.types';
import { ChatHeader } from '../chat-header/ChatHeader';
import { MessageComposer } from '../message-composer/MessageComposer';
import { MessagesList } from '../message-list/MessageList';

type Props = {
  user: UserPreview;

  onChatCreated: (chatId: string) => void;
};

export const DraftChatContent = ({ user, onChatCreated }: Props) => {
  const sendFirstMessage = useSendFirstMessage();

  const handleSend = async (content: string, files: File[]) => {
    const result = await sendFirstMessage.mutateAsync({
      recipientId: user.id,
      content,
      files,
    });

    if (result.chat_id) onChatCreated(result.chat_id);
  };

  return (
    <>
      <ChatHeader
        chat={{
          id: user.id,
          title: user.username,
          avatar: user.avatar ?? '',
          isGroup: false,
          participantId: user.id,
          membersCount: 2,
          lastSeen: user.lastSeen || '',
        }}
      />

      <MessagesList
        messages={[]}
        mediaItems={[]}
        onBottomChange={() => true}
        chatId={user.id}
      />

      <MessageComposer
        onSend={handleSend}
        chatId={user.id}
        onEdit={() => false}
      />
    </>
  );
};
