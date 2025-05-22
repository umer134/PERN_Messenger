import { BASE_URL } from "../../constants";

const MessageFiles = ({files}) => {

    if(!files || files.length === 0) return null;

    return (
        <div className="message-attachments">
            {files.map((file, index) => (
                <a key={index} href={`${BASE_URL}${file.file_path}`} target="_blank" rel="noopener noreferrer">
                {/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file.file_path) ? (
                    <img
                    src={`${BASE_URL}${file.file_path}`}
                    alt="attachment"
                    style={{ maxWidth: '200px', borderRadius: '8px', marginTop: '5px' }}
                    />
                ) : (
                    <div style={{ marginTop: '5px' }}>📎 Скачать файл</div>
                )}
                </a>
            ))}
        </div>
    )
};

export default MessageFiles;