import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ToggleTheme from './ToggleTheme';
import './BurgerMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../constants";

const BurgerMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
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
                        <div className="logout-logo">
                            <button onClick={handleLogout} style={{ border: 0, background: 0 }}>
                            <FontAwesomeIcon 
                                icon={faArrowRightFromBracket} 
                                style={{ transform: 'scaleX(-1)'}} 
                                size="2x"
                            />
                        </button>
                        <div className="avatar">
                            {user.avatar ? 
                            <img src={`${BASE_URL}${user.avatar}`} alt="" /> : 
                            <FontAwesomeIcon icon={faUser} size="2x" />}
                        </div>
                        <ToggleTheme />
                        </div>                
                        <h1>{user?.name || "unknown"}</h1>
                    </div>
                </div>
                <div className="menu-item">⚙️ Настройки</div>
                <div className="menu-item" onClick={handleLogout}>🚪 Выйти</div>
                </div>
            )}
        </div>
    )

};

export default BurgerMenu;