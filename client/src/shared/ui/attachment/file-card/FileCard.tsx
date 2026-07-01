import { Download, FileText, X } from 'lucide-react';

import * as s from './file-card.css';

import { resolveMediaUrl } from '@/shared/lib';

type Props = {
  name: string;

  url?: string;

  removable?: boolean;

  onRemove?: () => void;
};

export const FileCard = ({ name, url, removable, onRemove }: Props) => {
  const resolvedUrl = url ? resolveMediaUrl(url) : undefined;

  return (
    <div className={s.root}>
      <div className={s.left}>
        <FileText size={22} />

        {resolvedUrl ? (
          <a
            className={s.filename}
            href={resolvedUrl}
            download={name}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        ) : (
          <span className={s.filename}>{name}</span>
        )}
      </div>

      {removable ? (
        <button className={s.iconButton} type="button" onClick={onRemove}>
          <X size={16} />
        </button>
      ) : resolvedUrl ? (
        <a
          className={s.iconButton}
          href={resolvedUrl}
          download={name}
          target="_blank"
          rel="noreferrer"
        >
          <Download size={16} />
        </a>
      ) : null}
    </div>
  );
};
