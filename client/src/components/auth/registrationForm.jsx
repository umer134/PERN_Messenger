import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { clearError, registration } from '../../features/auth/authSlice';
import './loginForm.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatarFile); // 👈 добавляем файл
    }
    dispatch(registration(formData));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file); // <--- например, если тебе ещё нужен файл для запроса
    }
  };

  return (
    <form className="reg-form" onSubmit={handleSubmit}>
      <div className="avatar-container">
        {avatar ? (
          <img src={avatar} className="add-avatar" />
        ) : (
          <div className="avatar-icon">
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              style={{
                position: 'absolute',
                right: '44px',
                top: '40px',
              }}
            />
          </div>
        )}
        <label htmlFor="photo-upload" className="upload-btn">
          📷
        </label>
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
      </div>
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign Up'}
      </button>
      {error && (
        <div
          className="error"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {error}
          <button
            className="error-btn"
            type="button"
            onClick={() => dispatch(clearError())}
          >
            ×
          </button>
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
