import { useEffect, useState } from 'react';

import { ArrowLeft, User, Pencil, Check, X } from 'lucide-react';

import * as s from './profile-panel.css';

import { Avatar } from '@/shared/ui/Avatar';
import { useAppSelector } from '@/app/hooks';
import { AvatarPicker } from '@/shared/ui/avatar-picker/AvatarPicker';
import { Field } from '@/shared/ui/field/Field';
import { Input } from '@/shared/ui/input/Input';
import { useUpdateProfile } from '@/features/update-profile/hooks/useUpdateProfile';

type Props = {
  onBack: () => void;
};

export const ProfilePanel = ({ onBack }: Props) => {
  const updateProfile = useUpdateProfile();

  const { username, avatar, id } = useAppSelector((state) => state.currentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [form, setForm] = useState({ username });

  const handleSave = async () => {
    await updateProfile.mutateAsync({
      username: form.username ?? '',
      avatar: avatarFile,
    });
  };

  useEffect(() => {
    setForm({ username });
  }, [username]);

  return (
    <div className={s.root}>
      <header className={s.header}>
        <button onClick={onBack} className={s.backButton}>
          <ArrowLeft size={20} />
        </button>

        <span className={s.title}>Профиль</span>

        <div className={s.headerActions}>
          {!isEditing ? (
            <button className={s.iconButton} onClick={() => setIsEditing(true)}>
              <Pencil size={18} />
            </button>
          ) : (
            <>
              <button
                className={s.confirmButton}
                onClick={() => {
                  setForm({ username });
                  setAvatarFile(undefined);
                  setIsEditing(false);
                }}
              >
                <X size={18} />
              </button>

              <button className={s.confirmButton} onClick={handleSave}>
                <Check size={18} />
              </button>
            </>
          )}
        </div>
      </header>

      <div className={s.content}>
        <div className={s.avatarSection}>
          {isEditing ? (
            <AvatarPicker
              value={avatarFile}
              initialAvatar={avatar}
              onChange={setAvatarFile}
            />
          ) : (
            <>
              {avatar ? <Avatar src={avatar} size="xl" /> : <User size="xl" />}
            </>
          )}
        </div>

        <Field label="username">
          <Input
            value={form.username ?? ''}
            disabled={!isEditing}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </Field>
      </div>
    </div>
  );
};
