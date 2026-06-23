import { ConversationPreview } from '../../../entities/conversation/model/conversation.types';
import { useSendFirstMessage } from '../../../entities/messages/hooks/useSendFirstMessage';
import { User } from '../../../entities/user/model/user.types';
import { ConversationHeader } from '../conversation-header/ConversationHeader';
import { MessageComposer } from '../message-composer/MessageComposer';
import { MessagesList } from '../message-list/MessageList';

type Props = {
  user: User;

  onConversationCreated: (chatId: string) => void;
};

export const DraftConversationContent = ({
  user,
  onConversationCreated,
}: Props) => {
  const sendFirstMessage = useSendFirstMessage();

  const handleSend = async (content: string, files: File[]) => {
    const result = await sendFirstMessage.mutateAsync({
      recipientId: user.id,
      content,
      files,
    });

    if (result.chat_id) onConversationCreated(result.chat_id);
  };

  return (
    <>
      <ConversationHeader
        conversation={{
          id: user.id,
          title: user.username,
          avatar: user.avatar,
          isGroup: false,
          participantId: user.id,
        }}
      />

      <MessagesList
        messages={[]}
        mediaItems={[]}
        onBottomChange={() => true}
        conversationId={user.id}
      />

      <MessageComposer
        onSend={handleSend}
        conversationId={user.id}
        onEdit={() => false}
      />
    </>
  );
};
