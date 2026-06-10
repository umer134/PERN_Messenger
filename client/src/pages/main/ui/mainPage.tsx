import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useMainPageBootstrap } from "../lib/mainPage.bootstrap";

import * as s from './MainPage.css';
import { ConversationList } from "../../../widgets/chat-list/ChatList";
import { ConversationView } from "../../../widgets/chat-window/ConversationView";


const MainPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const { id } = useAppSelector(state => state.currentUser);

  useMainPageBootstrap(id ? id : '');

  if (!id) return <div>Loading...</div>;

  return (
  <div className={s.root}>
    <ConversationList
      selectedConversationId={
        selectedConversationId
      }
      onSelectedConversationId={
        setSelectedConversationId
      }
    />
    <ConversationView
      selectedConversationId={
        selectedConversationId
      }
    />
  </div>
    );
};

export default MainPage;