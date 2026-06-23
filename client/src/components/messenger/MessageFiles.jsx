import { useEnv } from '../../hooks/useEnv';

const MessageFiles = ({ files }) => {
  const { baseUrl: BASE_URL } = useEnv();

  if (!files || files.length === 0) return null;

  return (
    <div className="message-attachments">
      {files.map((file, index) => (
        <a
          key={index}
          href={`${BASE_URL}${file.file_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="attachment-item"
        >
          {/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file.file_path) ? (
            <img
              src={`${BASE_URL}${file.file_path}`}
              alt="attachment"
              className="attachment-image"
            />
          ) : (
            <div className="attachment-file">📎 Скачать файл</div>
          )}
        </a>
      ))}
    </div>
  );
};

export default MessageFiles;
