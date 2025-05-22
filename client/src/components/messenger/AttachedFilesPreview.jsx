
const AttachedFilesPreview = ({files, setFiles}) => {

    if(!files || files.length === 0) return null;

    return (
        <div className="attached-files-preview">
            {Array.from(files).map((file, index) => (
              <div key={index} className="file-preview">
                {file.type.startsWith('image') ? (
                  <img src={URL.createObjectURL(file)} alt="preview" className="preview-img" />
                ) : (
                  <div className="file-icon">{file.name}</div>
                )}
                <button
                  className="remove-file-btn"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
    );
};

export default AttachedFilesPreview;