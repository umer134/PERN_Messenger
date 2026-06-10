import { useRef, useState } from "react";

export const useVoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const intervalRef =
  useRef<number | null>(null);

  const chunksRef =
    useRef<Blob[]>([]);

  const startRecording =
    async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

        chunksRef.current = [];

        const recorder =
          new MediaRecorder(stream);

        recorder.ondataavailable =
          (event) => {
            if (
              event.data.size > 0
            ) {
              chunksRef.current.push(
                event.data
              );
            }
          };

        recorder.start();

        mediaRecorderRef.current =
          recorder;

        setRecording(true);
        setDuration(0);

        intervalRef.current = window.setInterval(() => {
          setDuration(prev => prev + 1);
        }, 1000);

      } catch (error) {
        console.error(
          "Voice recording error",
          error
        );
      }
    };

  const stopRecording = (): Promise<Blob | null> => {
      return new Promise(
        (resolve) => {
          const recorder =
            mediaRecorderRef.current;

          if (!recorder) {
            resolve(null);
            return;
          }

          recorder.onstop = () => {
            const blob =
              new Blob(
                chunksRef.current,
                {
                  type:
                    "audio/webm",
                }
              );

            recorder.stream
              .getTracks()
              .forEach(
                (track) =>
                  track.stop()
              );

            chunksRef.current =
              [];

            mediaRecorderRef.current =
              null;

            setRecording(false);

            if (intervalRef.current) {
              clearInterval(
                intervalRef.current
              );

              intervalRef.current = null;
            }

            resolve(blob);
          };

          recorder.stop();
        }
      );
    };

    const cancelRecording = () => {
      const recorder = mediaRecorderRef.current;

      if(!recorder) return;

      if(intervalRef.current) {
        clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;
      }

      recorder.stream.getTracks().forEach(track => track.stop());

      chunksRef.current = [];

      mediaRecorderRef.current = null;

      setDuration(0);

      setRecording(false);
    };

  return {
    recording,

    duration,

    startRecording,

    stopRecording,

    cancelRecording,
  };
};