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
            dispatch(setActiveChatUserId(userId));
            onClose();
        } catch (e) {
            console.error("Ошибка:", e);
            alert("Не удалось отправить сообщение.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[10000]">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">💬 Отправить первое сообщение</h3>
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите сообщение..."
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={handleSendFirstMessage}
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalChat;