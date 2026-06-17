import {
  FileText,
  Download,
  X,
} from "lucide-react";

import * as s from "./file-card.css";
import { resolveMediaUrl } from "../../../lib/media/resolveMediaUrl";

type Props = {
  name: string;

  url?: string;

  removable?: boolean;

  onRemove?: () => void;
};

export const FileCard = ({
  name,
  url,
  removable,
  onRemove,
}: Props) => {
  const resolvedUrl = url ? resolveMediaUrl(url) : undefined;

  return (
    <div className={s.root}>
      <div className={s.left}>
        <FileText size={18} />

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
          <span className={s.filename}>
            {name}
          </span>
        )}
      </div>

      {resolvedUrl && !removable && (
        <a
          href={resolvedUrl}
          download={name}
          target="_blank"
          rel="noreferrer"
          aria-label={`Download ${name}`}
        >
          <Download size={14} />
        </a>
      )}

      {removable && (
        <button
          type="button"
          onClick={onRemove}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};