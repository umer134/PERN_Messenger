import { useEffect, useMemo, useState } from "react";
import { FilePreview } from "./file-preview/FilePreview";
import { ImagePreview } from "./image/ImagePreview";
import { ImageCard } from "../../../../shared/ui/attachment/image-card/ImageCard";
import { FileCard } from "../../../../shared/ui/attachment/file-card/FileCard";

type Props = {
  file: File;
  onRemove: () => void;
};

export const AttachmentPreview = ({
  file,
  onRemove,
}: Props) => {
  const [previewUrl, setPreviewUrl] =
    useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (file.type.startsWith("image/")) {
    return (
      <ImageCard
        src={previewUrl}
        alt={file.name}
        removable
        onRemove={onRemove}
      />
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