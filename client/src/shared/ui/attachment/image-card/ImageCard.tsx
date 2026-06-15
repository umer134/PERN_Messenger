import { X } from "lucide-react";

import * as s from "./image-card.css";
import { useMediaViewer } from "../../../../features/media-viewer/lib/useMediaViewer";

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
    <div className={s.root}
      onClick={onClick}
    >
      <img
        src={`http://localhost:5002${src}`}
        alt={alt}
        className={s.image}
      />

      {removable && (
        <button
          type="button"
          className={s.removeButton}
          onClick={onRemove}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};