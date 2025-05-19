import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons' 
import { logoutUser } from "../features/auth/authSlice";
import socket from "../features/socketIO/socket";
import { BASE_URL } from "../constants";
import SearchUsers from "../components/searchUsers/searchUsers";
import ChatList from "../components/messenger/chatList";
import ChatWindow from "../components/messenger/chatWindow";
import './mainPage.css'

const MainPage = () => {
    const dispatch = useDispatch();
    const { user, isLoading, } = useSelector((state) => state.auth);
    const { activeChatId, } = useSelector((state) => state.chat);
    
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
    socket.emit('join_chat', (user.id));
    }, [user]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="message-app">
            <div className="container">
                <div className="user-container">
                <div className="logout-logo">
                    <button onClick={handleLogout} style={{ border: 0, background: 0 }}>
                    <FontAwesomeIcon 
                        icon={faArrowRightFromBracket} 
                        style={{ transform: 'scaleX(-1)'}} 
                        size="2x"
                    />
                </button>
                <div className="avatar">
                    {user.avatar ? 
                    <img src={`${BASE_URL}${user.avatar}`} alt="" /> : 
                    <FontAwesomeIcon icon={faUser} size="2x" />}
                </div>
                </div>                
                <h1>hi, {user?.name || "unknown"}</h1>
                </div>
                <div className="search-block">
                    { <SearchUsers />
                    }
                </div>
            </div>
            <main>
                 <div className="chats">
                    { <ChatList user={user} />
                    }
                </div>
                 <div>
                { activeChatId && <ChatWindow chatId={activeChatId} />
                }
            </div>
            </main>
               <footer>
                
               </footer>
        </div>
    );
};

export default MainPage;