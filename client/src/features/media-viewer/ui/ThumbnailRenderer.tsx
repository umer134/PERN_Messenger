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
  switch (media.type) {
    case "image":
      return (
        <img
          src={media.url}
          alt={media.name}
          className={s.thumbnailImage}
        />
      );

    case "video":
      return <Video size={20} />;

    case "audio":
      return <Music size={20} />;
  }
};