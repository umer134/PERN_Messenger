import { useState } from 'react';

import * as s from './chat-list.css';

import { CurrentUserPanel } from './current-user-panel/CurrentUserPanel';

import { SearchBar } from './search-bar/SearchBar';

import { ChatItems } from './chat-items/ChatItems';

import { useSearchUser } from '../../features/search-user/hooks/useSearchUser';
import { SearchResults } from '../../features/search-user/ui/SearchResults';
import { SelectedChat } from '../../entities/chat/model/selected-chat.types';
import { useLoadChats } from '@/features/chat/hooks';
import { useChatEvents } from '@/features/chat/hooks';
import { LeftPanelView } from './model/chat-list.types';
import { ProfilePanel } from './profile-panel/ProfilePanel';
import { SettingsPanel } from './settings-panel/SettingsPanel';
import { UserPreview } from '@/entities';

type Props = {
  selectedChat: SelectedChat | null;
  onSelectedChat: (chat: SelectedChat) => void;
};

export const ChatList = ({ selectedChat, onSelectedChat }: Props) => {
  const [view, setView] = useState<LeftPanelView>('dialogs');

  const [query, setQuery] = useState('');

  const { data: chats = [], isLoading } = useLoadChats();
  const { data: users = [] } = useSearchUser(query);

  useChatEvents();

  const handleSelectUser = (user: UserPreview) => {
    const existingChat = chats.find((chat) => chat.participantId === user.id);

    if (existingChat) {
      onSelectedChat({
        type: 'chat',
        data: existingChat,
      });

      return;
    }

    onSelectedChat({
      type: 'draft',

      draft: {
        id: `draft-${user.id}`,
        participant: user,
        isVirtual: true,
      },
    });
  };

  return (
    <aside className={s.root}>
      <div className={s.pages}>
        <div className={view === 'dialogs' ? s.dialogsActive : s.dialogsHidden}>
          <CurrentUserPanel
            onOpenProfile={() => setView('profile')}
            onOpenSettings={() => setView('settings')}
          />

          <SearchBar value={query} onChange={setQuery} />

          {query.length > 0 ? (
            <SearchResults users={users} onSelectUser={handleSelectUser} />
          ) : (
            <ChatItems
              chats={chats}
              selectedChat={
                selectedChat?.type === 'chat' ? selectedChat.data : null
              }
              onSelect={(chat) =>
                onSelectedChat({
                  type: 'chat',
                  data: chat,
                })
              }
            />
          )}
        </div>

        <div
          className={`${s.page} ${
            view === 'profile' ? s.profileActive : s.profileHidden
          }`}
        >
          <ProfilePanel onBack={() => setView('dialogs')} />
        </div>

        <div
          className={`${s.page} ${
            view === 'settings' ? s.settingsActive : s.settingsHidden
          }`}
        >
          <SettingsPanel onBack={() => setView('dialogs')} />
        </div>
      </div>
    </aside>
  );
};
