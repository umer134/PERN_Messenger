import { resolveMediaUrl } from '@/shared/lib';

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
