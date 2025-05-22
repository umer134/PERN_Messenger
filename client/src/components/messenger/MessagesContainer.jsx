import MessageFiles from "./MessageFiles";

const MessagesContainer = ({messages, user, activeChatUserId}) => {

    if(!messages || messages.length === 0) return null;

    return (
        <>
        { messages.map((message) => {
        const isOwn = message.sender?.id !== activeChatUserId;
        return (
        <div
        key={message.id}
        className={`message ${isOwn ? 'own' : 'other'} ${message.isOptimistic ? 'optimistic' : ''}`}
        style={message.isOptimistic ? { opacity: 0.6 } : {}}
        >
        <div className="message-header">
            <span className="sender">{message.sender?.username === user.name ? 'You' : message.sender?.username }</span>
        </div>
        <MessageFiles files={message?.attachedFiles} />
        <div className="message-content">{message.content}</div>
        {isOwn && (
        <div className='message-status'>
            {
            //message.is_read ? '✓✓' : '✓'
            }
        </div>
        )}
        </div>
        );
        })}
        </>
    )
};

export default MessagesContainer;