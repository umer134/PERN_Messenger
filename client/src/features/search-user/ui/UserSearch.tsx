import { useState } from 'react';

import { SearchBar } from '@/widgets/chat-list/search-bar/SearchBar';

import { SearchResults } from './SearchResults';

import { useSearchUser } from '../hooks/useSearchUser';

export const UserSearch = () => {
  const [query, setQuery] = useState('');

  const { data = [] } = useSearchUser(query);

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />

      {query.length > 0 && <SearchResults users={data} />}
    </>
  );
};
