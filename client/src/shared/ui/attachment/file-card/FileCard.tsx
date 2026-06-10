import {
  FileText,
  X,
} from "lucide-react";

import * as s from "./file-card.css";

type Props = {
  name: string;

  removable?: boolean;

  onRemove?: () => void;
};

export const FileCard = ({
  name,
  removable,
  onRemove,
}: Props) => {
  return (
    <div className={s.root}>
      <div className={s.left}>
        <FileText size={18} />

        <span className={s.filename}>
          {name}
        </span>
      </div>

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