import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useCreateChatMutation,
    useSendMessageMutation
} from '../../features/chat/chatApi';
import { setActiveChatId, setActiveChatUserId } from "../../features/chat/chatSlice";

const ModalChat = ({ onClose }) => {
    const [text, setText] = useState('');
    const [createChat] = useCreateChatMutation();
    const [sendMessage] = useSendMessageMutation();

    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.chat);

    const handleSendFirstMessage = async () => {
        if (!text.trim()) return;

        try {
            const chat = await createChat({ userId }).unwrap();

            await sendMessage({
                chatId: chat.id,
                content: text
            });

            dispatch(setActiveChatId(chat.id));
            dispatch(setActiveChatUserId(userId))
            onClose(); // закрыть модалку
        } catch (e) {
            console.error("Ошибка при создании чата или отправке сообщения:", e);
            alert("Не удалось отправить сообщение.");
        }
    };

    return (
        <div 
        className="modal-chat"
        >
            <h3>Отправить первое сообщение</h3>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите сообщение"
            />
            <button onClick={handleSendFirstMessage}>Отправить</button>
            <button onClick={onClose}>Отмена</button>
        </div>
    );
};

export default ModalChat;