import * as s from './search-results.css';

import { User } from '../../../entities/user/model/user.types';
import { UserCard } from '../../../entities/user/ui/UserCard';

type Props = {
  users: User[];

  onSelectUser: (user: User) => void;
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
