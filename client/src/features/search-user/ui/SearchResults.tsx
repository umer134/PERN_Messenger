import * as s from './search-results.css';

import { UserPreview } from '@/entities/user/';
import { UserCard } from '@/entities/user/';

type Props = {
  users: UserPreview[];

  onSelectUser: (user: UserPreview) => void;
};

export const SearchResults = ({ users, onSelectUser }: Props) => {
  if (!users.length) {
    return <div className={s.empty}>Nothing found</div>;
  }

  return (
    <div className={s.root}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={onSelectUser} />
      ))}
    </div>
  );
};
