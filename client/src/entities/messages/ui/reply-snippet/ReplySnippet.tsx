import * as s from "./reply-snippet.css";

type Props = {
  sender: string;

  content: string;
};

export const ReplySnippet = ({
  sender,
  content,
}: Props) => {
  return (
    <div className={s.root}>
      <div className={s.author}>
        {sender}
      </div>

      <div className={s.content}>
        {content}
      </div>
    </div>
  );
};