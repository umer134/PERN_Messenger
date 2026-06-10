import { Pause, Play } from "lucide-react";
import * as s from './voice-card.css';
import { useVoicePlayer } from "./hooks/useVoicePlayer";
import { formatDuration } from "../../../lib/format/formatDuration";
import React from "react";

type Props = {
  id: string;

  src: string;

  waveform?: number[];
};

export const VoiceCard = ({ id, src, waveform }: Props) => {
  const { audioRef, toggle, playing, currentTime, duration } = useVoicePlayer(src, id);

  const progress = duration > 0 ? currentTime / duration : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const ratio = (e.clientX - rect.left) / rect.width;

    if(audioRef.current) {
      audioRef.current.currentTime = duration * ratio;
    }
  };

  const bars = waveform ?? [
    8,
    12,
    18,
    22,
    28,
    20,
    14,
    10,
    16,
    22,
    28,
    24,
    18,
    12,
  ];

  const activeBars = Math.floor(
    progress * bars.length
  );

  return (
    <div className={s.root}>
      <audio
        ref={audioRef}
        src={src}
      />

      <button
        type="button"
        onClick={toggle}
        className={s.playButton}
      >
        {playing ? (
          <Pause size={18} />
        ) : (
          <Play size={18}/>
        )}
      </button>

      <div className={s.body}>
        <div
          className={s.waveform}
          onClick={handleSeek}
        >
          {bars.map((bar, index) => (
            <span
              key={index}
              className={
                index <= activeBars
                  ? `${s.bar} ${s.activeBar}`
                  : s.bar
              }
              style={{
                height: Math.max(bar * 28, 6),
              }}
            />
          ),
          )}
        </div>
        <div className={s.duration}>
          {formatDuration(
            currentTime
          )}
          {" / "}
          {formatDuration(
            duration
          )}
        </div>
      </div>
    </div>
  )
}
