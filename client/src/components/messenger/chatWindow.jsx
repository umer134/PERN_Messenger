import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../features/socketIO/socket';
import { BASE_URL } from '../../constants';
import { 
  useGetMessagesQuery,
  useSendMessageMutation,
  useReadMessageMutation,
  useGetChatsQuery
} from '../../features/chat/chatApi';
import './chatWindow.css';
import { setActiveChatId, setActiveChatUserId, setIsReadIndicator } from '../../features/chat/chatSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ChatInput from './ChatInput';
import MessageFiles from './MessageFiles';

const ChatWindow = ({chatId}) => {
  const [text, setText] = useState('');
  const [close, setClose] = useState(false);
  const [files, setFiles] = useState([]);
  const [optimisticMessages, setOptimisticMessages] = useState([]);
  const { activeChatUserId, activeChatId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { data = [], isLoading, isError, refetch: refetchMessages } = useGetMessagesQuery(chatId, {skip: chatId === 0});
  const {refetch: refetchChats} = useGetChatsQuery();
  const [sendMessage] = useSendMessageMutation();
  const [markMessageAsRead] = useReadMessageMutation();
  const dispatch = useDispatch();

  console.log('files', data)

  useEffect(() => {
  const handleReceiveMessage = (message) => {
    if (message.chatId === chatId) {
      refetchMessages();
      if (activeChatUserId && activeChatId) {
        markMessageAsRead(message.chatId);
      }
    }
  };

  socket.on('receive_message', handleReceiveMessage);

  return () => {
    socket.off('receive_message', handleReceiveMessage); 
  };
}, [chatId, activeChatUserId, activeChatId, refetchMessages, markMessageAsRead]);

  useEffect (() => {
    if(chatId && activeChatUserId) {
      markMessageAsRead(chatId).then(() => {
        refetchChats(chatId); 
      }).catch(err => console.log('mistake while reading message:', err));
    }
  }, [chatId, activeChatUserId]);

  useEffect(() => {
    setOptimisticMessages([]);
  }, [chatId]);

  useEffect(() => {
    if(close === true) {
      dispatch(setActiveChatUserId(null));
      dispatch(setActiveChatId(null));
      setClose(false)
    }
  }, [close]);

  const handleSendMessage = async () => {
    if (!text.trim() || !files) return;
    
    const tempId = Date.now(); 
    const newMessage = {
      id: tempId,
      content: text || (files.length ? '📎 File' : ''),
      sender: { username: 'You' }, 
      isOptimistic: true,
      files: files || [],
    };
    
    setOptimisticMessages(prev => [...prev, newMessage]);
    setText('');

    const formData = new FormData();
    formData.append('content', text);
    if(files) files.map((file) => formData.append('files', file));

    try {
      await sendMessage({ chatId: Number(chatId), formData }).unwrap();
      socket.emit('send_message', ({
        toUserId: activeChatUserId,
        message: {
          content: text,
          files: files,
          sender: {
            id: user.id, 
            username: user.name, 
            avatar: user.avatar
          },
          chatId: chatId,
          sent_at: Date.now()
        }
      }))
      setOptimisticMessages(prev => prev.filter(m => m.id !== tempId));
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
      setOptimisticMessages(prev => prev.filter(m => m.id !== tempId));
    }
  };

  const allMessages = [
    ...(data?.messages || []),
    ...optimisticMessages
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  console.log('allMes', allMessages)

   // scroll settings place 
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom(); 
  }, []);

  useEffect(() => {
    scrollToBottom(); 
  }, [allMessages]);
  //=================================

  if (isLoading) return <div className="loading">Loading messages...</div>;
  if (isError) return <div className="error">Failed to load messages</div>;

  return (
    <div className="chat-window" > 
        <button onClick={() => setClose(true)} className='chat-exist-btn'>
          <FontAwesomeIcon icon={faArrowLeft} size='2x' />
        </button>
      <div className="messages-container">
         {allMessages.map((message) => {
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
      <div ref={messagesEndRef} />
      <div>
        {files.length > 0 && (
          <div className="attached-files-preview">
            {Array.from(files).map((file, index) => (
              <div key={index} className="file-preview">
                {file.type.startsWith('image') ? (
                  <img src={URL.createObjectURL(file)} alt="preview" className="preview-img" />
                ) : (
                  <div className="file-icon">{file.name}</div>
                )}
                <button
                  className="remove-file-btn"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <ChatInput text={text} setFiles={setFiles} setText={setText} onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;