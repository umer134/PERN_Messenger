import { X } from 'lucide-react';

import * as s from './image-card.css';
import { resolveMediaUrl } from '@/shared/lib';

type Props = {
  src: string;

  alt?: string;

  onClick?: () => void;

  removable?: boolean;

  onRemove?: () => void;
};

export const ImageCard = ({
  src,
  alt,
  onClick,
  removable,
  onRemove,
}: Props) => {
  return (
    <div className={s.root} onClick={onClick}>
      <img src={resolveMediaUrl(src)} alt={alt} className={s.image} />

      {removable && (
        <button type="button" className={s.removeButton} onClick={onRemove}>
          <X size={14} />
        </button>
      )}
    </div>
  );
};
