import * as s from './typing-indicator.css';

interface TypingIndicatorProps {
  statusText: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const TypingIndicator = ({
  statusText,
  size = 'md',
}: TypingIndicatorProps) => {
  return (
    <span className={s.typingContainer({ size })}>
      <span>{statusText} is typing</span>
      <span className={`${s.dot({ size })} ${s.dot1}`}></span>
      <span className={`${s.dot({ size })} ${s.dot2}`}></span>
      <span className={`${s.dot({ size })} ${s.dot3}`}></span>
    </span>
  );
};
