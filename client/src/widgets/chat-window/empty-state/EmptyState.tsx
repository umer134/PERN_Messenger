import { MessageCircle } from 'lucide-react';

import * as s from './empty-state.css';

export const EmptyState = () => {
  return (
    <div className={s.root}>
      <MessageCircle size={48} />

      <h2 className={s.title}>Welcome back</h2>

      <p className={s.subtitle}>Select a conversation to start messaging</p>
    </div>
  );
};
