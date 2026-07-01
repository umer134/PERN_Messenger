import { cn } from '@/shared/lib/cn';
import * as styles from './button.css';
import { Loader2 } from 'lucide-react';

type Props = {
  variant?: keyof typeof styles.variants;
  size?: keyof typeof styles.sizes;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={cn(styles.base, styles.variants[variant], styles.sizes[size])}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} />}
      {children}
    </button>
  );
};
