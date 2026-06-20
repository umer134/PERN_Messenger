import { Settings, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";

import * as s from "./current-user-panel.css";
import { Avatar } from "../../../shared/ui/Avatar";
import { useAppSelector } from "../../../app/hooks";
import { useLogout } from "../../../features/auth/hooks/useLogout";

type Props = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
};

export const CurrentUserPanel = ({ onOpenProfile, onOpenSettings }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { username, avatar } = useAppSelector(
    state => state.currentUser
  );

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };


  return (
    <div className={s.root}>

      <div className={s.left}>
        <div className={s.avatar}>
          {avatar ? (
            <Avatar size="md" src={avatar} />
          ) : (
            <User size={18} />
          )}
        </div>

        <div className={s.info}>
          <span className={s.username}>
            {username}
          </span>

          <span className={s.status}>
            online
          </span>
        </div>
      </div>


      <div className={s.menuWrapper}>

        <button
          className={s.settingsButton}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <Menu size={18} />
        </button>


        {isOpen && (
          <div className={s.menu}>

            <button className={s.menuItem}
              onClick={onOpenProfile}
            >
              <User size={16} />
              {username}
            </button>

            <button
              className={s.menuItem}
              onClick={onOpenSettings}
            >
              <Settings size={16}/>
              Настройки
            </button>

            <button className={s.menuItem}
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Выйти
            </button>

          </div>
        )}

      </div>

    </div>
  );
};