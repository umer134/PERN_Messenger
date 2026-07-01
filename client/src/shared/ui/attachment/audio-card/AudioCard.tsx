import { X, Mic } from 'lucide-react';

import { resolveMediaUrl } from '@/shared/lib';

import * as s from './audio-card.css';

type Props = {
  src: string;
  name: string;

  removable?: boolean;

  onRemove?: () => void;

  onClick?: () => void;
};

export const AudioCard = ({
  src,
  name,
  removable,
  onRemove,
  onClick,
}: Props) => {
  return (
    <div className={s.root}>
      {removable && (
        <button type="button" className={s.removeButton} onClick={onRemove}>
          <X size={14} color="#fff" />
        </button>
      )}

      <div className={s.header} onClick={onClick}>
        <Mic size={18} />

        <span className={s.name}>{name}</span>
      </div>

      <audio controls className={s.audio} src={resolveMediaUrl(src)} />
    </div>
  );
};
