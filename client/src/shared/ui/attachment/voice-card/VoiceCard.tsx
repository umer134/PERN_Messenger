import { Pause, Play } from 'lucide-react';
import * as s from './voice-card.css';
import { useVoicePlayer } from './hooks/useVoicePlayer';
import { formatDuration } from '@/shared/lib';
import React from 'react';

type Props = {
  id: string;

  src: string;

  waveform?: number[];
};

export const VoiceCard = ({ id, src, waveform }: Props) => {
  const { audioRef, toggle, playing, currentTime, duration } = useVoicePlayer(
    src,
    id,
  );

  const progress = duration > 0 ? currentTime / duration : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const ratio = (e.clientX - rect.left) / rect.width;

    if (audioRef.current) {
      audioRef.current.currentTime = duration * ratio;
    }
  };

  const generatedBars = React.useMemo(() => {
    if (duration <= 0) {
      return Array.from({ length: 5 }, () => Math.floor(Math.random() * 2) + 2);
    }

    const barCount =
      duration <= 0 ? 5 : Math.max(5, Math.min(50, Math.round(duration * 1.5)));

    return Array.from({ length: barCount }, (_, i) => {
      const seed = Math.sin(i * 12.9898) * 43758.5453;

      return 8 + Math.abs(seed % 20);
    });
  }, [duration]);

  const bars = waveform ?? generatedBars;

  const activeBars = Math.floor(progress * bars.length);

  return (
    <div className={s.root}>
      <audio ref={audioRef} src={src} />

      <button type="button" onClick={toggle} className={s.playButton}>
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <div className={s.body}>
        <div className={s.waveform} onClick={handleSeek}>
          {bars.map((bar, index) => (
            <span
              key={index}
              className={
                index <= activeBars ? `${s.bar} ${s.activeBar}` : s.bar
              }
              style={{
                height: `${Math.max(bar, 4)}px`,
              }}
            />
          ))}
        </div>
        <div className={s.duration}>
          {formatDuration(currentTime)}
          {' / '}
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};
