import { MessageCircle } from 'lucide-react';

import { useTranslation } from 'react-i18next';

import * as s from './empty-state.css';

export const EmptyState = () => {
  const { t } = useTranslation('chat');

  return (
    <div className={s.root}>
      <MessageCircle size={48} />

      <h2 className={s.title}>{t('empty.title')}</h2>

      <p className={s.subtitle}>{t('empty.subtitle')}</p>
    </div>
  );
};
