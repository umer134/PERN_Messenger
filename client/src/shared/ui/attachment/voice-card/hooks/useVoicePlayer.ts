import  { useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from '../../../../../features/audio/audio-player/model/useAudioPlayer';

export const useVoicePlayer = (src: string, id: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [playing, setPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const { activeAudioId, setActiveAudioId } = useAudioPlayer();

  const toggle = () => {
    const audio = audioRef.current;

    if(!audio) return;

    if(audio.paused) {
      setActiveAudioId(id)

      audio.play();
      
      setPlaying(true);

    } else {
      audio.pause();

      setPlaying(false);

      setActiveAudioId(null);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if(!audio) return;

    if(activeAudioId !== id && !audio.paused) {
      audio.pause(); 

      setPlaying(false);
    }
  }, [setActiveAudioId, id])

  useEffect(() => {
    const audio = audioRef.current;

    if(!audio) return;

    const handleTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoaded = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      audio.currentTime = 0;

      setPlaying(false);

      setCurrentTime(0);

      setActiveAudioId(null);
    };

    audio.addEventListener(
      "timeupdate",
      handleTime
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoaded
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoaded
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [setActiveAudioId]);

  return {
    audioRef,

    toggle,

    playing,

    currentTime,

    duration,
  };
};