import { useContext } from 'react';

import { AudioPlayerContext } from './AudioPlayerContext';

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error('AudioPlayerProvider missing');
  }

  return context;
};
