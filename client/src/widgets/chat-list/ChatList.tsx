import { useState } from "react";

import * as s from "./chat-list.css";

import { CurrentUserPanel }
from "./current-user-panel/CurrentUserPanel";

import { SearchBar }
from "./search-bar/SearchBar";

import { ConversationItems } from "./conversation-items/ConversationItems";

import { mockConversations } from "../../entities/conversation/data/mock-conversations";

export const ConversationList = ({selectedConversationId, onSelectedConversationId}) => {

  return (
    <aside className={s.root}>
      <CurrentUserPanel />

      <SearchBar />

      <ConversationItems
        conversations={mockConversations}
        selectedConversationId={
          selectedConversationId
        }
        onSelect={onSelectedConversationId}
      />
    </aside>
  );
};