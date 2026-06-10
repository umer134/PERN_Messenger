import { ImageCard } from "../../../../shared/ui/attachment/image-card/ImageCard";
import { FileCard } from "../../../../shared/ui/attachment/file-card/FileCard";

import { MessageAttachmentVM } from "../../model/message.types";
import { MediaItem } from "../../../../features/media-viewer/model/media-viewer.types";
import { useMediaViewer } from "../../../../features/media-viewer/lib/useMediaViewer";
import { VoiceCard } from "../../../../shared/ui/attachment/voice-card/VoiceCard";

type Props = {
  attachment: MessageAttachmentVM;

  mediaItems: MediaItem[];
};

export const AttachmentRenderer = ({ attachment, mediaItems }: Props) => {
  const { open } = useMediaViewer();
  
  const activeIndex = mediaItems.findIndex(item => 
    item.id === attachment.id
  );

  if (attachment.type === "image") {
    return (
      <ImageCard
        src={attachment.url ?? ""}
        alt={attachment.name}
        onClick={() => 
          open(
            mediaItems, activeIndex
          )
        }
      />
    );
  } else if (
    attachment.type === 'voice'
  ) {
    return (
      <VoiceCard
        id={attachment.id}
        src={attachment.url!}
        waveform={attachment.waveform}
      />
    );
  }

  return (
    <FileCard
      name={attachment.name}
    />
  );
};