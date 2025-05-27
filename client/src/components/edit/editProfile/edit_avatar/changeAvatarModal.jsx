import{ useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './changeAvatarModal.css';
import getCroppedImg from '../../../../utils/cropImage'; // утилита ниже

const ChangeAvatarModal = ({ file, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedBlob = await getCroppedImg(URL.createObjectURL(file), croppedAreaPixels);
    onSave(croppedBlob);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="crop-container">
          <Cropper
            image={URL.createObjectURL(file)}
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
        <div className="controls">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="buttons">
            <button onClick={onClose}>Отмена</button>
            <button onClick={handleSave}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
