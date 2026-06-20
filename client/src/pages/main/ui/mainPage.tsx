import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
// import { useMainPageBootstrap } from "../lib/mainPage.bootstrap";

import * as s from './MainPage.css';
import { ConversationList } from "../../../widgets/chat-list/ChatList";
import { ConversationView } from "../../../widgets/chat-window/ConversationView";
import { SelectedConversation } from "../../../entities/conversation/model/selected-conversation.types";
import socket from "../../../shared/socket/socket";


const MainPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);

  const { id } = useAppSelector(state => state.currentUser);

  // useMainPageBootstrap(id ? id : '');

  if (!id) return <div>Loading...</div>;

  return (
  <div className={s.root}>
    <ConversationList
      selectedConversation={
        selectedConversation
      }
      onSelectedConversation={
        setSelectedConversation
      }
    />
    <ConversationView
      selectedConversation={
        selectedConversation
      }
      onSelectedConversation={
        setSelectedConversation
      }
    />
  </div>
    );
};

export default MainPage;