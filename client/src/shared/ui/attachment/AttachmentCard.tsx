import { PropsWithChildren } from 'react';
import { X } from 'lucide-react';

import * as s from './attachment-card.css';

type Props = PropsWithChildren<{
  removable?: boolean;
  onRemove?: () => void;
}>;

export const AttachmentCard = ({ children, removable, onRemove }: Props) => {
  return (
    <div className={s.root}>
      {children}

      {removable && (
        <button
          type="button"
          className={s.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          <X size={14} color="#fff" />
        </button>
      )}
    </div>
  );
};
