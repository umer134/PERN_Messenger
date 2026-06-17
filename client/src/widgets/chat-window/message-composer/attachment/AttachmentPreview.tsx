import { useEffect, useMemo, useState } from "react";
import { ImageCard } from "../../../../shared/ui/attachment/image-card/ImageCard";
import { FileCard } from "../../../../shared/ui/attachment/file-card/FileCard";
import { VideoCard } from "../../../../shared/ui/attachment/video-card/VideoCard";
import { AudioCard } from "../../../../shared/ui/attachment/audio-card/AudioCard";
import { getAttachmentType } from "../../../../entities/messages/lib/getAttachmentType";

type Props = {
  file: File;
  onRemove: () => void;
};

export const AttachmentPreview = ({
  file,
  onRemove,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const attachmentType = useMemo(
    () => getAttachmentType(file),
    [file]
  );

  useEffect(() => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (attachmentType === "image") {
    return (
      <ImageCard
        src={previewUrl}
        alt={file.name}
        removable
        onRemove={onRemove}
      />
    );
  }

  if (attachmentType === "video") {
    return (
      <div>
        <VideoCard
          src={previewUrl}
          onClick={() => undefined}
        />
        <FileCard
          name={file.name}
          removable
          onRemove={onRemove}
        />
      </div>
    );
  }

  if (attachmentType === "audio" || attachmentType === "voice") {
    return (
      <div>
        <AudioCard
          src={previewUrl}
          name={file.name}
          onClick={() => undefined}
        />
        <FileCard
          name={file.name}
          removable
          onRemove={onRemove}
        />
      </div>
    );
  }

  return (
    <FileCard
      name={file.name}
      removable
      onRemove={onRemove}
    />
  );
};
