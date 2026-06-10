
import * as s from './message-context-menu.css';
import { MessageAction } from '../model/message-actions.types';

type Props = {
  canEdit: boolean;

  onAction: (action: MessageAction) => void;
};

export const MessageContextMenu = ({ canEdit, onAction }: Props) => {

  return (
    <div className={s.root}>
      <button className={s.item} onClick={() => onAction("reply")}>
        Reply
      </button>
      {canEdit && (
        <button className={s.item} onClick={() => onAction("edit")}>
          Edit
        </button>
      )}

      <button className={s.item} onClick={() => onAction("copy")}>
        Copy
      </button>

      {canEdit && (
        <button className={s.item} onClick={() => onAction("delete")}>
          Delete
        </button>
      )}
    </div>
  );
};