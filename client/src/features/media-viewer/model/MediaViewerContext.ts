import { createContext } from 'react';

import { MediaItem } from './media-viewer.types';

type MediaViewerState = {
  items: MediaItem[];

  activeIndex: number;
};

export type MediaViewerContextValue = {
  open: (items: MediaItem[], activeIndex: number) => void;
  close: () => void;
};

export const MediaViewerContext = createContext<MediaViewerContextValue | null>(
  null,
);
