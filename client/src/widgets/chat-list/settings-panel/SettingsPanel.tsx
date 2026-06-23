import { ArrowLeft, Moon, Bell, Shield } from 'lucide-react';

import * as s from './settings-panel.css';

type Props = {
  onBack: () => void;
};

export const SettingsPanel = ({ onBack }: Props) => {
  return (
    <div className={s.root}>
      <header className={s.header}>
        <button onClick={onBack} className={s.backButton}>
          <ArrowLeft size={20} />
        </button>

        <span className={s.title}>Настройки</span>
      </header>

      <div className={s.content}>
        <button className={s.item}>
          <Moon size={18} />
          <span>Тема</span>
        </button>

        <button className={s.item}>
          <Bell size={18} />
          <span>Уведомления</span>
        </button>

        <button className={s.item}>
          <Shield size={18} />
          <span>Приватность</span>
        </button>
      </div>
    </div>
  );
};
