import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { 
  selectActiveMessage,
  selectMessageAction,
} from "../../../features/message-actions/model/message-actions.selectors";

import {
  Paperclip,
  Send,
  Mic,
  Square,
  Trash2,
} from "lucide-react";

import { useVoiceRecorder } from "./hooks/useVoiceRecorder";

import * as s from "./message-composer.css";
import { AttachmentPreview } from "./attachment/AttachmentPreview";
import { formatDuration } from "../../../shared/lib/format/formatDuration";
import { ReplyPreview } from "./reply-preview/ReplyPreview";
import { clearAction } from "../../../features/message-actions/model/message-actions.slice";

type Props = {
  onSend: (
    content: string,
    files: File[]
  ) => void;
};

export const MessageComposer = ({
  onSend,
}: Props) => {

  const dispatch = useAppDispatch();

  const actionType = useAppSelector(selectMessageAction);
  const activeMessage = useAppSelector(selectActiveMessage);

  const { recording, duration, 
    startRecording, stopRecording, 
    cancelRecording 
  } = useVoiceRecorder();

  const [message, setMessage] =
    useState("");

  const [files, setFiles] =
    useState<File[]>([]);

  const textareaRef =
  useRef<HTMLTextAreaElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed =
      message.trim();

    if (!trimmed && files.length === 0)
      return;

    onSend(trimmed, files);

    setMessage("");
    setFiles([]);
    dispatch(clearAction());
  };

  const handleVoiceRecording = async() => {

    if(!recording) {
      await startRecording();
      return;
    }

    const blob = await stopRecording();

    if(!blob) return;

    const file = new File(
      [blob], `voice-${Date.now()}.webm`,
      {
        type: 'audio/webm',
      }
    );

    onSend("", [file]);
  };

  useEffect(() => {
    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [message]);

  return (
    <div className={s.root}>
      {actionType === "reply" && 
        activeMessage && (
          <ReplyPreview
            author={
              activeMessage.senderId ?? "Unknown"
            }
            content={
              activeMessage.content ?? ""
            }
            onClose={() => dispatch(clearAction())}
          />
        )
      }

      {files.length > 0 && (
        <div className={s.attachments}>
          {files.map((file) => (
            <AttachmentPreview
              key={`${file.name}-${file.size}`}
              file={file}
              onRemove={() => 
                setFiles((prev) => 
                  prev.filter((f) => f !== file)
                )
              }
            />
          ))}
        </div>
      )}

      <input
        hidden
        multiple
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const selected =
            Array.from(
              e.target.files ?? []
            );

          setFiles(prev => [
            ...prev,
            ...selected
          ]);
        }}
      />

      <div className={s.inputRow}>
        <button
          className={s.iconButton}
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          <Paperclip size={18} />
        </button>

        {recording ? (
          <div className={s.recording} > 
            <button
              type="button"
              className={s.cancelButton}
              onClick={cancelRecording}
            >
              <Trash2 size={16} />
            </button>

            <span className={s.recordingDot} />

            <span>Recording</span>

            <span>{formatDuration(duration)}</span>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            className={s.textarea}
            value={message}
            placeholder="Type a message..."
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();

                handleSend();
              }
            }}
          />
        )}

        {message.trim() ||
        files.length > 0 ? (
          <button
            className={s.sendButton}
            onClick={handleSend}
          >
            <Send size={18} />
          </button>
        ) : (
          <button
            className={s.voiceButton}
            onClick={
              handleVoiceRecording
            }
          >
            {recording ? (
              <Square size={18} />
            ): (
              <Mic size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};