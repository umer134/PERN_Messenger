import { FileText, Image, X } from 'lucide-react';

import * as s from './file-preview.css';
import { FileCard } from '@/shared/ui';

type Props = {
  file: File;
  onRemove: () => void;
};

export const FilePreview = ({ file, onRemove }: Props) => {
  const isImage = file.type.startsWith('image/');

  return (
    <div className={s.root}>
      {isImage ? (
        <Image size={16} />
      ) : (
        <FileCard name={file.name} removable onRemove={onRemove} />
      )}

      {/* <div className={s.left}>
        {isImage ? (
          <Image size={16} />
        ) : (
          <FileText size={16} />
        )}

        <span className={s.name}>
          {file.name}
        </span>
      </div>

      <button
        type="button"
        className={s.removeButton}
        onClick={onRemove}
      >
        <X size={16} />
      </button> */}
    </div>
  );
};
