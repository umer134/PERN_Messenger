import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import * as styles from './avatar-crop-modal.css';

import { Button } from '@/shared/ui/button';
import { getCroppedImg } from '@/features/avatar-upload/lib/cropImage';

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  imageSrc: string;
  onClose: () => void;
  onSave: (file: File) => void;
};

export const AvatarCropModal = ({ imageSrc, onClose, onSave }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CropArea | null>(null);

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: CropArea) => {
      setCroppedArea(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!croppedArea) return;

    const blob = await getCroppedImg(imageSrc, croppedArea);

    const file = new File([blob], `avatar-${Date.now()}.jpg`, {
      type: 'image/jpeg',
    });

    onSave(file);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Crop avatar</h3>
        <div className={styles.cropArea}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <input
            className={styles.slider}
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="button" onClick={handleSave}>
            Save avatar
          </Button>
        </div>
      </div>
    </div>
  );
};
