import { useTranslation } from 'react-i18next';
import * as s from './typing-indicator.css';
import { NAMESPACE } from '@/shared/i18n/namespaces';

interface TypingIndicatorProps {
  statusText: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const TypingIndicator = ({
  statusText,
  size = 'md',
}: TypingIndicatorProps) => {
  const { t } = useTranslation(NAMESPACE.CHAT);

  return (
    <span className={s.typingContainer({ size })}>
      <span>
        {statusText} {t('status.typing')}
      </span>
      <span className={`${s.dot({ size })} ${s.dot1}`}></span>
      <span className={`${s.dot({ size })} ${s.dot2}`}></span>
      <span className={`${s.dot({ size })} ${s.dot3}`}></span>
    </span>
  );
};
