import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SearchUsers from "../../../components/searchUsers/searchUsers";
import ChatList from "../../../components/messenger/chatList";
import ChatWindow from "../../../components/messenger/chatWindow";
import './mainPage.css'
import BurgerMenu from "../../../components/burger_menu/BurgerMenu";
import { useAppSelector } from "../../../app/hooks";
import { useMainPageBootstrap } from "../lib/mainPage.bootstrap";


const MainPage = () => {
    const { id } = useAppSelector(state => state.currentUser);
    const { activeChatId, } = useSelector((state) => state.chat);
    
    let profile = useAppSelector((state) => state.currentUser);

   useMainPageBootstrap(id ?? id);

    if (!id) return <div>Loading...</div>;

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