import * as s from "./reply-preview.css";

type Props = {
  author: string;

  content: string;

  onClose: () => void;
};

export const ReplyPreview = ({
  author,
  content,
  onClose,
}: Props) => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.author}>
          {author}
        </div>

        <div className={s.text}>
          {content}
        </div>
      </div>

      <button
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};