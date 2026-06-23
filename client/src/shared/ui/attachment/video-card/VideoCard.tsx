import { resolveMediaUrl } from '../../../lib/media/resolveMediaUrl';

type Props = {
  src: string;
  onClick: () => void;
};

export const VideoCard = ({ src, onClick }: Props) => {
  return (
    <video
      muted
      controls
      preload="metadata"
      style={{
        maxWidth: 320,
        borderRadius: 12,
      }}
      onClick={onClick}
    >
      <source src={resolveMediaUrl(src)} />
    </video>
  );
};
