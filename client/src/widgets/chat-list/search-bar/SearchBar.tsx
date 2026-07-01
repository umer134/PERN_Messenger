import { useTranslation } from 'react-i18next';

import { Search } from 'lucide-react';

import * as s from './search-bar.css';

type Props = {
  value: string;

  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => {
  const { t } = useTranslation('chat');

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Search size={16} />

        <input
          value={value}
          className={s.input}
          placeholder={t('search.placeholder')}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
