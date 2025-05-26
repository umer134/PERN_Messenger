import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../features/socketIO/socket';
import { 
  useGetMessagesQuery,
  useSendMessageMutation,
  useReadMessageMutation,
  useGetChatsQuery
} from '../../features/chat/chatApi';
import './chatWindow.css';
import { setActiveChatId, setActiveChatUserId } from '../../features/chat/chatSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ChatInput from './ChatInput';
import AttachedFilesPreview from './AttachedFilesPreview';
import MessagesContainer from './MessagesContainer';

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
    if (!text.trim() && !files.length > 0) return;
    
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
      }));

      setOptimisticMessages(prev => prev.filter(m => m.id !== tempId));
      setFiles([]);
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
        <MessagesContainer messages={allMessages} user={user} activeChatUserId={activeChatUserId}/>
        <AttachedFilesPreview files={files} setFiles={setFiles} />
        <div ref={messagesEndRef} />
      </div>
      <ChatInput text={text} setFiles={setFiles} setText={setText} onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;