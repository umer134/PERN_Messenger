import { useContext } from 'react';
import { MediaViewerContext } from '../model/MediaViewerContext';

export const useMediaViewer = () => {
  const context = useContext(MediaViewerContext);

  if (!context) {
    throw new Error('MediaViewerProvider missing');
  }

  return context;
};
