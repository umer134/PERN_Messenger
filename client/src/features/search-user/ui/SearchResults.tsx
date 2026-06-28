import * as s from './search-results.css';

import { UserPreview } from '@/entities/user/';
import { UserCard } from '@/entities/user/';
import { useTranslation } from 'react-i18next';

type Props = {
  users: UserPreview[];

  onSelectUser: (user: UserPreview) => void;
};

export const SearchResults = ({ users, onSelectUser }: Props) => {
  const { t } = useTranslation('common');

  if (!users.length) {
    return <div className={s.empty}>{t('error.undefined')}</div>;
  }

  return (
    <div className={s.root}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={onSelectUser} />
      ))}
    </div>
  );
};
