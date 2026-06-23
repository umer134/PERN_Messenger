// features/message-actions/ui/EditPreview.tsx

import * as s from './edit-preview.css';

type Props = {
  content: string;
  onClose: () => void;
};

export const EditPreview = ({ content, onClose }: Props) => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.title}>Editing message</div>

        <div className={s.text}>{content}</div>
      </div>

      <button onClick={onClose}>✕</button>
    </div>
  );
};
