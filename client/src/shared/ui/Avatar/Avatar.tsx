import { useState } from 'react';
import clsx from 'clsx';

import * as s from './Avatar.css';
import { User2 } from 'lucide-react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'none';

type Props = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export const Avatar = ({
  src,
  alt,
  fallback = '?',
  size = 'md',
  status = 'none',
  className,
  onClick,
}: Props) => {
  const [error, setError] = useState(false);

  const showImage = src && !error;
  console.log('avatar:', src)

  return (
    <div className={clsx(s.avatar({ size }), className)}
      onClick={onClick}
    >
      {showImage ? (
        <img
          src={`http://localhost:5002${src}`}
          alt={alt ?? 'avatar'}
          className={s.image}
          onError={() => setError(true)}
        />
      ) : (
        <User2  />
      )}

      {status !== 'none' && (
        <span
          className={s.status}
          style={s.statusColor[status]}
        />
      )}
    </div>
  );
};