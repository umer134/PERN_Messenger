import * as s from './search-results.css';

import { UserPreview } from '@/entities/user/';
import { UserCard } from '@/entities/user/';
import { Loader } from '@/shared/ui/Loader';
import { useTranslation } from 'react-i18next';

type Props = {
  users: UserPreview[];

  isLoading: boolean;

  onSelectUser: (user: UserPreview) => void;
};

export const SearchResults = ({ users, isLoading, onSelectUser }: Props) => {
  const { t } = useTranslation('common');

  if (isLoading) {
    return <Loader />;
  }

  if (!users.length) {
    return (
      <div className={s.root}>
        <h3 className={s.empty}>{t('error.undefined')}</h3>
      </div>
    );
  }

  return (
    <div className={s.root}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={onSelectUser} />
      ))}
    </div>
  );
};
