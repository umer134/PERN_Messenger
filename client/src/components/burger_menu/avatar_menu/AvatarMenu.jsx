import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../constants";
import { useEffect, useState } from "react";
import { useRef } from "react"; // обязательно
import ChangeAvatarModal from "../../edit/editProfile/edit_avatar/changeAvatarModal";
import { useUpdateProfileMutation } from "../../../features/profile/profileApi";


const AvatarMenu = ({ user, expanded, setExpanded }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // <== выбранный файл
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar);
  const [updateProfile] = useUpdateProfileMutation();

  const fileInputRef = useRef();

  const handleSetClick = () => {
    fileInputRef.current.click(); // программный клик
    console.log('handleSetClick')
  };

  const handleFileChange = (e) => {
    console.log('handleFileChange')
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // запускаем модалку
    }

    e.target.value = null;
  };

  const handleSaveAvatar = (blob) => {
  const file = new File([blob], 'avatar.jpg', { type: blob.type }); // ← теперь с именем и расширением
  const formData = new FormData();
  formData.append('avatar', file);
  updateProfile(formData);
  };

  useEffect(() => {
    setAvatarUrl(user?.avatar);
  }, [user]);

  useEffect(() => {
    if(expanded) setShowMenu(true);
    else if(!expanded){ setShowMenu(false); setOpenMenu(false) };
  },[expanded]);


  return (
    <div className={`avatar ${expanded ? "expanded" : ""}`}>
      {avatarUrl ? (
        <img
          src={`${BASE_URL}${avatarUrl}`}
          alt="avatar"
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
      ) : (
        <FontAwesomeIcon icon={faUser} size="2x" 
        onClick={() => {
            setExpanded(!expanded);
          }} 
        />
      )}

      {showMenu && (
        <button
          className="avatar-menu"
          onClick={() => setOpenMenu(!openMenu)}
          style={{ border: "none", background: "none", zIndex: 20, color:'aliceblue' }}
        >
          =
        </button>
      )}

      {openMenu && (
        <div className="avatar-settings-menu">
          <p onClick={handleSetClick}>set</p>
          <p>delete</p>
          <p>save</p>
        </div>
      )}

      {/* скрытый input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* отображение модалки при выборе файла */}
      {selectedFile && (
        <ChangeAvatarModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          onSave={(croppedBlob) => {
            handleSaveAvatar(croppedBlob);
            console.log("croppedBlob: ", croppedBlob);
            setSelectedFile(null); // закрыть модалку
          }}
        />
      )}
    </div>
  );
};

export default AvatarMenu;