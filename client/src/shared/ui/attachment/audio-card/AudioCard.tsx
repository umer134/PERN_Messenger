import { resolveMediaUrl } from '../../../lib/media/resolveMediaUrl';

type Props = {
  src: string;

  name: string;

  onClick: () => void;
};

export const AudioCard = ({ src, name, onClick }: Props) => {
  return (
    <div>
      <div onClick={onClick}>{name}</div>

      <audio controls src={resolveMediaUrl(src)} />
    </div>
  );
};
