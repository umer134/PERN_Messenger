import { resolveMediaUrl } from '@/shared/lib';

import { AttachmentCard } from '@/shared/ui/attachment/AttachmentCard';

import * as s from '@/shared/ui/attachment/attachment-card.css';

type Props = {
  src: string;
  onClick: () => void;
  removable?: boolean;
  onRemove?: () => void;
};

export const VideoCard = ({ src, onClick, removable, onRemove }: Props) => {
  return (
    <AttachmentCard removable={removable} onRemove={onRemove}>
      <video
        src={resolveMediaUrl(src)}
        className={s.media}
        controls
        muted
        playsInline
        preload="metadata"
        onClick={onClick}
      />
    </AttachmentCard>
  );
};
