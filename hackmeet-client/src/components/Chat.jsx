import useSound from 'use-sound';
import popSound2 from "../audio/popSound2.mp3"
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';


const Chat = ({ sendMessage, setMessage, message, chats }) => {
    const [play] = useSound(popSound2);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleFormChange = (event) => {
        setMessage(event.target.value)
    }

    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiSelect = (emoji) => {
        setMessage(message + emoji);
    };

    const renderChat = chats.map((chat, index) => {
        if (chat.sender) {
            return <span key={index} className="p-2 rounded-3 text-white bg-dark d-flex align-self-end flex-wrap text-break shadow-secondary me-1" style={{ maxWidth: "75%" }}>{chat.message}</span>
        } else {
            return <span key={index} className="p-2 rounded-3 bg-white d-flex flex-wrap text-break shadow-secondary ms-1" style={{ maxWidth: "75%" }}>{chat.message}</span>
        }
    })
    return (
        <>
            <div className="h-100 w-100 d-flex flex-column align-items-start gap-3 overflow-y-scroll" id="chat-container">
                {renderChat}
            </div>
            <form className="d-flex position-absolute" style={{ bottom: 5, width: "95%" }} onSubmit={sendMessage}>
                <input type="text" className="form-control shadow-main" value={message} onChange={handleFormChange} />
                <i
                    onClick={handleEmojiClick}
                    className="bi bi-emoji-smile fs-2"
                    style={{ cursor: "pointer" }}
                ></i>
                <button onClick={play} type="submit" className="btn button-hover text-white shadow-main" style={{ backgroundColor: "var(--third-color" }}>Send</button>
            </form>
            {showEmojiPicker && (
                <EmojiPicker
                    onEmojiClick={(event, emojiObject) => handleEmojiSelect(emojiObject.emoji)}
                    disableSearchBar={true}
                />
            )}
        </>
    )
}

export default Chat