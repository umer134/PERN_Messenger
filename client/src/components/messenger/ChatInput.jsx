import { useState, useRef, useEffect } from "react";
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';


const ChatInput = ({text, setFiles, setText, onSend}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);
    const pickerRef = useRef(null);

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

    }, [showEmojiPicker])

    const handleEmojiClick = (emojiData) => {
        setText(prev => prev + emojiData.emoji);
        inputRef.current.focus();
    };

    const handleFileUpload = (files) => {
        const selectedFiles = Array.from(files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const handleKeyPress = (e) => {
        if(e === 'Enter') {
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

            <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
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