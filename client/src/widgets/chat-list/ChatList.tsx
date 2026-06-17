import { useState } from "react";

import * as s from "./chat-list.css";

import { CurrentUserPanel }
from "./current-user-panel/CurrentUserPanel";

import { SearchBar }
from "./search-bar/SearchBar";

import { ConversationItems } from "./conversation-items/ConversationItems";

import { mockConversations } from "../../entities/conversation/data/mock-conversations";
import { useSearchUser } from "../../features/search-user/hooks/useSearchUser";
import { SearchResults } from "../../features/search-user/ui/SearchResults";
import { SelectedConversation } from "../../entities/conversation/model/selected-conversation.types";
import { User } from '../../entities/user/model/user.types';
import { useLoadChats } from "../../entities/conversation/hooks/useLoadChats";
import { useConversationEvents } from "../../entities/conversation/hooks/useConverstionEvents";

type Props = {
  selectedConversation: SelectedConversation | null;
  onSelectedConversation: (conversation: SelectedConversation) => void;
};

export const ConversationList = ({selectedConversation, onSelectedConversation}: Props) => {
  const [query, setQuery] = useState("");

  const { data: users = [] } = useSearchUser(query); 

  useConversationEvents();

  const { data: conversations = [], isLoading} = useLoadChats();

  
  return (
    <aside className={s.root}>
      <CurrentUserPanel />

      <SearchBar
        value={query}
        onChange={setQuery}
      />

      {query.length > 0 ? (
        <SearchResults users={users} onSelectUser={(user) => onSelectedConversation({
          type: "draft",

          draft: {
            id: `draft-${user.id}`,

            participant: user,

            isVirtual: true,
          }

        })}/>
      ) : (
        <ConversationItems
          conversations={conversations}
          selectedConversation={
            selectedConversation?.type === "conversation"
              ? selectedConversation.data
              : null
          }
          onSelect={(conversation) => onSelectedConversation({ type: "conversation", data: conversation,})}
        />
      )}
    </aside>
  );
};