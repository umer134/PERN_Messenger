import { useState } from "react";

import * as s from "./chat-list.css";

import { CurrentUserPanel }
from "./current-user-panel/CurrentUserPanel";

import { SearchBar }
from "./search-bar/SearchBar";

import { ConversationItems } from "./conversation-items/ConversationItems";

import { useSearchUser } from "../../features/search-user/hooks/useSearchUser";
import { SearchResults } from "../../features/search-user/ui/SearchResults";
import { SelectedConversation } from "../../entities/conversation/model/selected-conversation.types";
import { useLoadChats } from "../../entities/conversation/hooks/useLoadChats";
import { useConversationEvents } from "../../entities/conversation/hooks/useConverstionEvents";
import { LeftPanelView } from "./model/conversation-list.types";
import { ProfilePanel } from "./profile-panel/ProfilePanel";
import { SettingsPanel } from "./settings-panel/SettingsPanel";

type Props = {
  selectedConversation: SelectedConversation | null;
  onSelectedConversation: (conversation: SelectedConversation) => void;
};

export const ConversationList = ({selectedConversation, onSelectedConversation}: Props) => {
  const [view, setView] = useState<LeftPanelView>("dialogs");  

  const [query, setQuery] = useState("");
  
  const { data: conversations = [], isLoading} = useLoadChats();
  const { data: users = [] } = useSearchUser(query); 

  useConversationEvents();
  
  return (
    <aside className={s.root}>

      <div className={s.pages}>

        <div className={
          view === "dialogs"
            ? s.dialogsActive
            : s.dialogsHidden
        }>

          <CurrentUserPanel
            onOpenProfile={() => setView("profile")}
            onOpenSettings={() => setView("settings")}
          />

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
        </div>

        <div className={`${s.page} ${
          view === "profile"
          ? s.profileActive
          : s.profileHidden
        }`}>
          <ProfilePanel
            onBack={() => setView("dialogs")}
          />
        </div>

        <div className={`${s.page} ${
          view === "settings"
          ? s.settingsActive
          : s.settingsHidden
        }`}>
          <SettingsPanel
            onBack={() => setView("dialogs")}
          />
        </div>
        
      </div>
    </aside>
  );
};