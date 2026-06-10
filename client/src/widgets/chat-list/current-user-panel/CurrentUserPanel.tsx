import { Settings, User } from "lucide-react";
import * as s from "./current-user-panel.css";
import { Avatar } from "../../../shared/ui/Avatar";
import { useAppSelector } from "../../../app/hooks";

export const CurrentUserPanel = () => {

  const { username, avatar } = useAppSelector(state => state.currentUser);

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

      <button className={s.settingsButton}>
        <Settings size={18} />
      </button>
    </div>
  );
};