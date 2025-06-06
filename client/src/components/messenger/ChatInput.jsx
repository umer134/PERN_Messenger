import { useState, useRef, useEffect } from "react";
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';


const ChatInput = ({text, setFiles, setText, onSend}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);
    const pickerRef = useRef(null);
     const textareaRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if(pickerRef.current && !pickerRef.current.contains(event.target)){
                setShowEmojiPicker(false);
            }
        };

        if(showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [showEmojiPicker]);

     useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Сброс
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 400) + "px";
        }
    }, [text]);

    const handleEmojiClick = (emojiData) => {
        setText(prev => prev + emojiData.emoji);
        inputRef.current.focus();
    };

    const handleFileUpload = (files) => {
        const selectedFiles = Array.from(files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const handleKeyPress = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            console.log('enter')
            onSend();
        }
    }

    return (
        <div className="message-input">
            <button
                className="emoji-button"
                onClick={() => setShowEmojiPicker(prev => !prev)}
                type="button"
            >
                <FontAwesomeIcon icon={faSmile} />
            </button>

            {showEmojiPicker && (
                <div className="emoji-picker-container" ref={pickerRef}>
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    emojiStyle="native" 
                />
                </div>
            )}

            <textarea
                ref={(el) => {
                    inputRef.current = el;
                    textareaRef.current = el;
                }}
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="chat-textarea"
                rows={1}
                style={{ maxHeight: '400px', overflowY: 'auto', resize: 'none' }}
            />
            <button onClick={onSend} className="send-message-btn">
                <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#4242c9" }} />
            </button>
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e.target.files)}
                />
            <label htmlFor="file-upload" className="file-upload-btn">
            📎
            </label>
        </div>
    )

};

export default ChatInput;