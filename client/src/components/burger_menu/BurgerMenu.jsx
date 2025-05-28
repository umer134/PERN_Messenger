import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import ToggleTheme from './togglemode/ToggleTheme';
import './BurgerMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, } from '@fortawesome/free-solid-svg-icons';
import EditName from "../edit/editProfile/edit_name/EditName";
import AvatarMenu from "./avatar_menu/AvatarMenu";
import './avatar_menu/avatarMenu.css';

const BurgerMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setOpen(!open);
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    };
    return (
        <div className="burger-container">
            <div className={`burger-icon ${open ? "open" : ""}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {open && (
                <div className="menu-dropdown">
                <div className="menu-header">
                <div className="user-container">
                <div className={`avatar-other ${expanded ? 'expanded' : ''}`}>
                    <AvatarMenu user={user} expanded={expanded} setExpanded={setExpanded} />
                    <div className={`logout-toggleTheme ${expanded ? 'expanded' : ''}`}>
                    <ToggleTheme />
                    <button onClick={handleLogout} style={{ border: 0, background: 0 }}>
                        <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        style={{ transform: 'scaleX(-1)' }}
                        size="2x"
                        />
                    </button>
                    </div>
                </div>
                {openEdit ? (
                    <EditName name={user?.name} setOpenEdit={setOpenEdit} />
                ) : (
                    <h1 onClick={() => setOpenEdit(true)}>{user?.name || 'unknown'}</h1>
                )}
                </div>
                </div>
                <div className="menu-item">⚙️ settings</div>
                <div className="menu-item" onClick={handleLogout}>🚪 exit</div>
                </div>
            )}
        </div>
    )

};

export default BurgerMenu;