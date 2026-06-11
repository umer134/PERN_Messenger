import { ImageCard } from "../../../../shared/ui/attachment/image-card/ImageCard";
import { FileCard } from "../../../../shared/ui/attachment/file-card/FileCard";

import { MessageAttachmentVM } from "../../model/message.types";
import { MediaItem } from "../../../../features/media-viewer/model/media-viewer.types";
import { useMediaViewer } from "../../../../features/media-viewer/lib/useMediaViewer";
import { VoiceCard } from "../../../../shared/ui/attachment/voice-card/VoiceCard";
import { AudioCard } from "../../../../shared/ui/attachment/audio-card/AudioCard";
import { VideoCard } from "../../../../shared/ui/attachment/video-card/VideoCard";

type Props = {
  attachment: MessageAttachmentVM;

  mediaItems: MediaItem[];
};

export const AttachmentRenderer = ({ attachment, mediaItems }: Props) => {
  const { open } = useMediaViewer();
  
  const activeIndex = mediaItems.findIndex(item => 
    item.id === attachment.id
  );

  switch (attachment.type) {
    case "image":
      return (
        <ImageCard
          src={attachment.url ?? ""}
          alt={attachment.name}
          onClick={() =>
            open(
              mediaItems,
              activeIndex
            )
          }
        />
      );

    case "voice":
      return (
        <VoiceCard
          id={attachment.id}
          src={attachment.url!}
          waveform={
            attachment.waveform
          }
        />
      );

    case "audio":
      return (
        <AudioCard
          src={attachment.url!}
          name={attachment.name}
          onClick={() => open(mediaItems, activeIndex)}
        />
      );

    case "video":
      return (
        <VideoCard
          src={attachment.url!}
          onClick={() => open(mediaItems, activeIndex)}
        />
      );

    default:
      return (
        <FileCard
          name={attachment.name}
        />
      );
  }
};