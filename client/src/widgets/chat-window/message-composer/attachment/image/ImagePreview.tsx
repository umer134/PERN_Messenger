import { useEffect, useMemo } from 'react';

import * as s from './image-preview.css';
import { ImageCard } from '@/shared/ui';

type Props = {
  file: File;
  onRemove: () => void;
};

export const ImagePreview = ({ file, onRemove }: Props) => {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className={s.root}>
      <ImageCard
        src={previewUrl}
        alt={file.name}
        removable
        onRemove={onRemove}
      />
    </div>
  );
};
