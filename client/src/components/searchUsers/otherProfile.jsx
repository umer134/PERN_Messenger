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
        <div className="other-profile-item">
            <div className="other-profile-avatar-block">
                <button onClick={() => removeUser(null)}>
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                    <div style={{fontSize:20}}>{user.username}</div>
                </button>
                <div className="other-profile-avatar">
                    {user.avatar ?
                    <img src={`${BASE_URL}${user.avatar}`} alt="" /> : 
                    <FontAwesomeIcon icon={faUser} size="2x"/>
                    }
                </div>
            </div>
            <button onClick={handleOpenChat} className="other-profile-chat">
                <FontAwesomeIcon icon={faUserPlus} size="2x" fontSize={20} style={{
                    paddingRight: 25,
                    borderRight: "1px solid black",
                    paddingLeft: 20}} />
                <FontAwesomeIcon icon={faMessage} size="2x"fontSize={50} style={{width:100, paddingLeft:15}}/>
            </button>
            {openChatModal && <ModalChat onClose={handleCloseModal} />}
        </div>
    );
};

export default OtherProfile;