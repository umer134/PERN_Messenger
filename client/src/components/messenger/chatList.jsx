import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CustomToast from '../customToast/CustomToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useGetChatsQuery } from '../../features/chat/chatApi';
import { setActiveChatId, setActiveChatUserId } from '../../features/chat/chatSlice';
import socket from '../../features/socketIO/socket'
import { BASE_URL } from '../../constants';
import './chatList.css'

const ChatList = () => {
  const {chatId, activeChatId} = useSelector((state)=> state.chat);
  const dispatch = useDispatch();
  const { data: chats, isLoading, error, refetch } = useGetChatsQuery({pollingInterval:10000});

  useEffect(() => {
    socket.on('receive_message', (message) => {
      toast(<CustomToast 
        username={message.sender.username}
        content={message.content}
        avatar={`${BASE_URL}${message.sender.avatar || <FontAwesomeIcon icon={faUser} size='2x'/>}`}
      />)
      refetch(message.chatId);
    });
    
    return () => {
      socket.off('receive_message');
    };
  }, [refetch]);

  const handleChangeChatAndUser = (chatId, userId) => {
    dispatch(setActiveChatId(chatId));
    dispatch(setActiveChatUserId(userId));
  }

  if (isLoading) return <div className="loading">Loading chats...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

   return (
    <div className="chat-container">
      <div className="chat-list">
        {chats?.map(chat => (
          <div 
            key={chat.id} 
            className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
            onClick={() => handleChangeChatAndUser(chat.id, chat.interlocutor?.id)}
          >
            <div className="chat-avatar">
              {chat.interlocutor?.avatar ?
                <img src={`${BASE_URL}${chat.interlocutor?.avatar}`} alt="" /> :
                <FontAwesomeIcon icon={faUser} size="lg" />
              }
            </div>
            <div className="chat-content">
              <div className="chat-header">
                <span className="chat-username">{chat.interlocutor?.username || 'Unknown'}</span>
              </div>
              <div className="chat-preview">
                <p className="chat-last-message">{chat.lastMessage?.content || 'No messages'}</p>
                {!chat.lastMessage?.is_read && chat.lastMessage.sender_id === chat.interlocutor.id 
                ?
                 <div className='newMessIndicator'></div>
                 : ''
                 }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;


