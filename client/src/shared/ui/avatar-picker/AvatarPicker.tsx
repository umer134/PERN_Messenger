import { Camera, User } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

import * as styles from './avatar-picker.css';

import { AvatarCropModal } from '../avatar-crop-modal/AvatarCropModal';
import { resolveMediaUrl } from '../../lib/media/resolveMediaUrl';

type Props = {
  value?: File;
  initialAvatar?: string | null;
  onChange: (file: File) => void;
}

export const AvatarPicker = ({value, initialAvatar, onChange}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [rawImage, setRawImage] = useState<string | null>(null);

  const setPreviewUrl = (url: string | null) => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }
    previewRef.current = url;
    setPreview(url);
  };

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => setPreviewUrl(null);
  }, [value]);

  const openPicker = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    inputRef.current?.click();
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>,) => {
    const file = e.target.files?.[0];

    if(!file) return;

    if(rawImage) {
      URL.revokeObjectURL(rawImage);
    }

    const url = URL.createObjectURL(file);

    setRawImage(url);

    e.target.value = '';
  };

  const avatarSrc =
  preview ||
  (initialAvatar
    ? resolveMediaUrl(initialAvatar)
    : null);

  return (
    <>
      <div
        className={styles.root}
        onClick={openPicker}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            className={styles.image}
          />
        ) : (
          <div 
            className={styles.placeholder}
          >
            <User size={28} />
          </div>
        )}

        <div className={`${styles.overlay} overlay`}>
          <Camera size={16} />
          <span>Change</span>
        </div>

        <input
          ref={inputRef}
          className={styles.hiddenInput}
          type='file'
          accept='image/*'
          onChange={onFileSelect}
        />
      </div>

      {rawImage && (
        <AvatarCropModal
          key={rawImage}
          imageSrc={rawImage}
          onClose={() => {
            if(rawImage) {
              URL.revokeObjectURL(rawImage);
            }
            setRawImage(null);
          }}
          onSave={(file) => {
            onChange(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setRawImage(null);
          }}
        />
      )}
    </>
  );
};