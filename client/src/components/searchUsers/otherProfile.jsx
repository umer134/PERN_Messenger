import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'; 
import {faMessage} from '@fortawesome/free-regular-svg-icons'
import { setActiveChatId, setActiveChatUserId, setUserId } from "../../features/chat/chatSlice";
import { useFindChatQuery } from "../../features/chat/chatApi";
import ModalChat from "../messenger/modalChat";
import { BASE_URL } from "../../constants";

const OtherProfile = ({ user, removeUser }) => {
    const [openChatModal, setOpenChatModal] = useState(false);
    const { data: chat } = useFindChatQuery(user.id);
    const dispatch = useDispatch();
    console.log('user', user)
    const handleOpenChat = () => {
        dispatch(setUserId(user.id));
        
        if (chat?.id) {
            dispatch(setActiveChatId(chat.id));
            dispatch(setActiveChatUserId(user.id));
        } else {
            setOpenChatModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenChatModal(false);
    };

    return (
        <div className="other-profile">
            <div className="profile-header">
                <button className="back-button" onClick={() => removeUser(null)}>
                <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="avatar">
                {user.avatar ? (
                    <img src={`${BASE_URL}${user.avatar}`} alt="avatar" />
                ) : (
                    <FontAwesomeIcon icon={faUser} size="2x" />
                )}
                </div>
                <h2 className="username">{user.username}</h2>
            </div>
            <div className="profile-actions">
                <button onClick={handleOpenChat}>
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Add</span>
                </button>
                <button onClick={handleOpenChat}>
                <FontAwesomeIcon icon={faMessage} />
                <span>Message</span>
                </button>
            </div>
            {openChatModal && <ModalChat onClose={handleCloseModal} />}
        </div>
    );
};

export default OtherProfile;