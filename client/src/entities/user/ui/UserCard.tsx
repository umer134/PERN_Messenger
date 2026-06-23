import * as s from './user-card.css';

import { User } from '../model/user.types';
import { Avatar } from '../../../shared/ui/Avatar';

type Props = {
  user: User;

  onClick: (user: User) => void;
};

export const UserCard = ({ user, onClick }: Props) => {
  return (
    <button className={s.root} onClick={() => onClick(user)}>
      <Avatar size="md" src={user.avatar} />

      <div className={s.content}>
        <div className={s.username}>{user.username}</div>
      </div>
    </button>
  );
};
