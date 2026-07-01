import { resolveMediaUrl } from '@/shared/lib';

import { AttachmentCard } from '@/shared/ui/attachment/AttachmentCard';

import * as s from '@/shared/ui/attachment/attachment-card.css';

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
    <AttachmentCard removable={removable} onRemove={onRemove}>
      <img
        src={resolveMediaUrl(src)}
        alt={alt}
        className={s.media}
        onClick={onClick}
      />
    </AttachmentCard>
  );
};
