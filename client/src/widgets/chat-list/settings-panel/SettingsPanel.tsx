import { ArrowLeft, Moon, Bell, Shield } from 'lucide-react';

import { useTranslation } from 'react-i18next';

import * as s from './settings-panel.css';

type Props = {
  onBack: () => void;
};

export const SettingsPanel = ({ onBack }: Props) => {
  const { t } = useTranslation(['common', 'settings']);

  return (
    <div className={s.root}>
      <header className={s.header}>
        <button onClick={onBack} className={s.backButton}>
          <ArrowLeft size={20} />
        </button>

        <span className={s.title}>{t('common:menu.settings')}</span>
      </header>

      <div className={s.content}>
        <button className={s.item}>
          <Moon size={18} />
          <span>{t('settings:settings.theme')}</span>
        </button>

        <button className={s.item}>
          <Bell size={18} />
          <span>{t('settings:settings.notifications')}</span>
        </button>

        <button className={s.item}>
          <Shield size={18} />
          <span>{t('settings:settings.privacy')}</span>
        </button>
      </div>
    </div>
  );
};
