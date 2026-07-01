import { useState } from 'react';

import { AudioPlayerContext } from './AudioPlayerContext';

type Props = {
  children: React.ReactNode;
};

export const AudioPlayerProvider = ({ children }: Props) => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  return (
    <AudioPlayerContext.Provider
      value={{
        activeAudioId,
        setActiveAudioId,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
