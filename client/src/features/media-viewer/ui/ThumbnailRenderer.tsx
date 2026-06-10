import { Image } from "lucide-react";
import { Video } from "lucide-react";
import { Music } from "lucide-react";

import {
  MediaItem,
} from "../model/media-viewer.types";

import * as s from './media-viewer-modal.css';

type Props = {
  media: MediaItem;
};

export const ThumbnailRenderer = ({
  media,
}: Props) => {
  if (
    media.type === "image" &&
    media.thumbnailUrl
  ) {
    return (
      <img
        src={media.thumbnailUrl}
        alt={media.name}
        className={s.thumbnailImage}
      />
    );
  }

  if (
    media.type === "video" &&
    media.thumbnailUrl
  ) {
    return (
      <img
        src={media.thumbnailUrl}
        alt=""
      />
    );
  }

  if (
    media.type === "audio"
  ) {
    return (
      <Music size={20} />
    );
  }

  return (
    <Image size={20} />
  );
};