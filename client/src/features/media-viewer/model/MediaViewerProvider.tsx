import { useState } from 'react';
import { MediaViewerContext } from './MediaViewerContext';
import { MediaItem } from './media-viewer.types';
import { MediaViewerModal } from '../ui/MediaViewerModal';

type Props = {
  children: React.ReactNode;
};

type MediaViewerState = {
  items: MediaItem[];

  activeIndex: number;
}

export const MediaViewerProvider = ({ children }: Props) => {
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [viewer, setViewer] = useState<MediaViewerState | null>(null);
  return (
    <MediaViewerContext.Provider
      value={{
        open: (items: MediaItem[], activeIndex: number) => setViewer({items, activeIndex}),
        close: () => setViewer(null),
      }}
    >
      {children}

      {viewer && (
        <MediaViewerModal
          items={viewer.items}
          activeIndex={viewer.activeIndex}
          onClose={() => setViewer(null)}
        />
      )}
    </MediaViewerContext.Provider>
  )
}