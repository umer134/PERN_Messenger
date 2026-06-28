import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  selectActiveMessage,
  selectMessageAction,
} from '@/features/message-actions/model';

import { Paperclip, Send, Mic, Square, Trash2 } from 'lucide-react';

import { useVoiceRecorder } from './hooks/useVoiceRecorder';

import * as s from './message-composer.css';
import { AttachmentPreview } from './attachment/AttachmentPreview';
import { formatDuration } from '@/shared/lib/format/formatDuration';
import { ReplyPreview } from './reply-preview/ReplyPreview';
import { clearAction } from '@/features/message-actions/model/message-actions.slice';
import { EditPreview } from './edit-preview/EditPreview';
import {
  emitTypingStart,
  emitTypingStop,
} from '@/shared/socket/emitters/typing.emitters';

type Props = {
  chatId: string;

  onSend: (content: string, files: File[]) => void;

  onEdit: (messageId: string, content: string) => void;
};

export const MessageComposer = ({ chatId, onSend, onEdit }: Props) => {
  const { t } = useTranslation('chat');

  const dispatch = useAppDispatch();

  const actionType = useAppSelector(selectMessageAction);
  const activeMessage = useAppSelector(selectActiveMessage);

  const {
    recording,
    duration,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useVoiceRecorder();

  const [message, setMessage] = useState('');

  const [files, setFiles] = useState<File[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const typingRef = useRef(false);
  const stopTimeRef = useRef<NodeJS.Timeout | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (typingRef.current) {
      emitTypingStop(chatId);

      typingRef.current = false;
    }

    const trimmed = message.trim();

    if (!trimmed && files.length === 0) return;

    if (actionType === 'edit' && activeMessage) {
      onEdit(activeMessage.id, trimmed);

      dispatch(clearAction());
      setMessage('');

      return;
    }

    onSend(trimmed, files);

    setMessage('');
    setFiles([]);
    dispatch(clearAction());
  };

  const handleVoiceRecording = async () => {
    if (!recording) {
      await startRecording();
      return;
    }

    const blob = await stopRecording();

    if (!blob) return;

    const file = new File([blob], `voice-${Date.now()}.webm`, {
      type: 'audio/webm',
    });

    onSend('', [file]);
  };

  useEffect(() => {
    const el = textareaRef.current;

    if (!el) return;

    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  }, [message]);

  useEffect(() => {
    if (actionType === 'edit' && activeMessage) {
      setMessage(activeMessage.content ?? '');

      textareaRef.current?.focus();
    }
  }, [actionType, activeMessage]);

  useEffect(() => {
    return () => {
      emitTypingStop(chatId);
    };
  }, [chatId]);

  return (
    <div className={s.root}>
      {actionType === 'reply' && activeMessage && (
        <ReplyPreview
          author={activeMessage.senderName ?? 'Unknown'}
          content={activeMessage.content ?? ''}
          onClose={() => dispatch(clearAction())}
        />
      )}

      {actionType === 'edit' && activeMessage && (
        <EditPreview
          content={activeMessage.content ?? ''}
          onClose={() => dispatch(clearAction())}
        />
      )}

      {files.length > 0 && (
        <div className={s.attachments}>
          {files.map((file) => (
            <AttachmentPreview
              key={`${file.name}-${file.size}`}
              file={file}
              onRemove={() =>
                setFiles((prev) => prev.filter((f) => f !== file))
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
          const selected = Array.from(e.target.files ?? []);

          setFiles((prev) => [...prev, ...selected]);
        }}
      />

      <div className={s.inputRow}>
        <button
          className={s.iconButton}
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip size={18} />
        </button>

        {recording ? (
          <div className={s.recording}>
            <button
              type="button"
              className={s.cancelButton}
              onClick={cancelRecording}
            >
              <Trash2 size={16} />
            </button>

            <span className={s.recordingDot} />

            <span>{t('composer.recording')}</span>

            <span>{formatDuration(duration)}</span>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            className={s.textarea}
            value={message}
            placeholder={t('composer.placeholder')}
            onChange={(e) => {
              const value = e.target.value;

              setMessage(value);

              if (!typingRef.current) {
                emitTypingStart(chatId);

                typingRef.current = true;
              }

              if (stopTimeRef.current) {
                clearTimeout(stopTimeRef.current);
              }

              stopTimeRef.current = setTimeout(() => {
                emitTypingStop(chatId);

                typingRef.current = false;
              }, 1500);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();

                handleSend();
              }
            }}
          />
        )}

        {message.trim() || files.length > 0 ? (
          <button className={s.sendButton} onClick={handleSend}>
            <Send size={18} />
          </button>
        ) : (
          <button className={s.voiceButton} onClick={handleVoiceRecording}>
            {recording ? <Square size={18} /> : <Mic size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
