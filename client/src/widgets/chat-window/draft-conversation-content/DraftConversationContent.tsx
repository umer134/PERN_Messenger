import { ConversationPreview } from "../../../entities/conversation/model/conversation.types";
import { useSendFirstMessage } from "../../../entities/messages/hooks/useSendFirstMessage";
import { User } from "../../../entities/user/model/user.types";
import { ConversationHeader } from "../conversation-header/ConversationHeader";
import { MessageComposer } from "../message-composer/MessageComposer";
import { MessagesList } from "../message-list/MessageList";


type Props = {
  user: User;

  onConversationCreated: (conversation: ConversationPreview) => void;
};

export const DraftConversationContent = ({ user, onConversationCreated}: Props) => {

  const sendFirstMessage = useSendFirstMessage();

  const handleSend = async (content: string, files: File[]) => {

    const result = await sendFirstMessage.mutateAsync({
      recipientId: user.id,
      content,
      files,
    });

    if(result.conversation.id)
    onConversationCreated({
      id: result.conversation.id,
      title: result.conversation.title,
      avatar: result.conversation.avatar || undefined,
      isGroup: result.conversation.isGroup,
      unreadCount: result.conversation.unreadCount,
      lastMessage: result.conversation.lastMessage || '',
      updatedAt: result.conversation.updatedAt,
      isVirtual: false || undefined,
      participantId: result.conversation.participantId || undefined,
      isOnline: result.conversation.isOnline,
    });

    console.log(result);
  };

  return (
    <>
      <ConversationHeader
        conversation={{
          id: user.id,
          title: user.username,
          avatar: user.avatar,
          isGroup: false,
        }}
      />

      <MessagesList
        messages={[]}
        mediaItems={[]}
      />

      <MessageComposer
        onSend={handleSend}
      />
    </>
  );
};