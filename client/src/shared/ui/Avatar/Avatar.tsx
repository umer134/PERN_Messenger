import { useState } from 'react';
import clsx from 'clsx';

import * as s from './Avatar.css';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'none';

type Props = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
};

export const Avatar = ({
  src,
  alt,
  fallback = '?',
  size = 'md',
  status = 'none',
  className,
}: Props) => {
  const [error, setError] = useState(false);

  const showImage = src && !error;

  return (
    <div className={clsx(s.avatar({ size }), className)}>
      {showImage ? (
        <img
          src={src}
          alt={alt ?? 'avatar'}
          className={s.image}
          onError={() => setError(true)}
        />
      ) : (
        <div className={s.fallback}>{fallback}</div>
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