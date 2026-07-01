import { createContext } from 'react';

export type AudioPlayerContextValue = {
  activeAudioId: string | null;

  setActiveAudioId: (id: string | null) => void;
};

export const AudioPlayerContext = createContext<
  AudioPlayerContextValue | undefined
>(undefined);
