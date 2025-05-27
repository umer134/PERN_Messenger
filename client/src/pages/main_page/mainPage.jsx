import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import socket from "../../features/socketIO/socket";
import SearchUsers from "../../components/searchUsers/searchUsers";
import ChatList from "../../components/messenger/chatList";
import ChatWindow from "../../components/messenger/chatWindow";
import './mainPage.css'
import '../darkmodeStyles.css'
import BurgerMenu from "../../components/burger_menu/BurgerMenu";

const MainPage = () => {
    const { user, isLoading, } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile);
    const { activeChatId, } = useSelector((state) => state.chat);
    const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
    socket.emit('join_chat', (user.id));
    }, [user]);

    useEffect(() => {
        if(theme === 'dark') {
            document.body.classList.add('dark');
        }
        else if (theme === 'light') {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="message-app">
            <div className="notific-block">
                <ToastContainer
                    position="bottom-right" autoClose={3000}
                />
            </div>
            <header style={{width:'100%'}}>
                <div className="container">
                    <BurgerMenu user={profile} />
                    <div className="search-block">
                        <SearchUsers /> 
                    </div>
                </div>
            </header>
            <main>
                <div className="chats">
                    <ChatList user={profile} />
                </div>
                <div>
                    {activeChatId && <ChatWindow chatId={activeChatId} />}
                </div>
            </main>
               <footer>
                
               </footer>
        </div>
    );
};

export default MainPage;