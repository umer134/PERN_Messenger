import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import * as s from './media-viewer-modal.css';

import { ImageViewer } from './ImageViewer';
import { VideoViewer } from './VideoViewer';
import { AudioViewer } from './AudioViewer';

import { MediaItem } from '../model/media-viewer.types';
import clsx from 'clsx';
import { ThumbnailRenderer } from './ThumbnailRenderer';

type Props = {
  items: MediaItem[];
  activeIndex: number;
  onClose: () => void;
};

export const MediaViewerModal = ({ items, activeIndex, onClose }: Props) => {
  const [index, setIndex] = useState(activeIndex);
  const media = items[index];

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent,
    ) => {
      if (e.key === "ArrowLeft") {
        setIndex(prev =>
          Math.max(prev - 1, 0)
        );
      }

      if (e.key === "ArrowRight") {
        setIndex(prev =>
          Math.min(
            prev + 1,
            items.length - 1
          )
        );
      }

      if (e.key === "Escape") {
        onClose();
      }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, [items.length, onClose]);

  return (
    <div
      className={s.backdrop}
    >
      <div className={s.header}>
        <span>
          {index + 1} / {items.length}
        </span>

        <span>
          {media.name}
        </span>

        <button
          onClick={onClose}
        >
          <X 
            color="white"
          />
        </button>
      </div>
      <div
        className={s.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={() => setIndex(prev => Math.max(prev -1, 0))}
          style={{color: 'white'}}
        >
          <ChevronLeft size={25} />
        </button>
        {media.type === "image" && (
          <ImageViewer src={media.url} />
        )} 
      
        {media.type === "video" && (
          <VideoViewer src={media.url} />
        )}

        {media.type === "audio" && (
          <AudioViewer src={media.url} />
        )}
        <button
          onClick={() => setIndex(prev => Math.min(prev + 1, items.length -1))}
          style={{color: 'white'}}
        >
          <ChevronRight size={25} />
        </button>
      </div>

      <div className={s.thumbnails}>
        {items.map((item, itemIndex) => (
          <button
            key={item.id}
            className={clsx(
              s.thumbnail,

              itemIndex === index &&
                s.thumbnailActive
            )}
            onClick={() =>
              setIndex(itemIndex)
            }
          >
            <ThumbnailRenderer
              media={item}
            />
          </button>
        ))}
      </div>
    </div>
  );
};