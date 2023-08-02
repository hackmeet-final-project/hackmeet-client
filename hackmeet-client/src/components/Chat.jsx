import useSound from 'use-sound';
import popSound2 from "../audio/popSound2.mp3"
import EmojiPicker from 'emoji-picker-react';
import { useEffect } from 'react';


const Chat = ({ sendMessage, setMessage, message, chats }) => {
    const [play] = useSound(popSound2);

    const handleFormChange = (event) => {
        setMessage(event.target.value)
    }

    const handleEmojiSelect = (emoji) => {
        setMessage(message + emoji);
    };

    useEffect(() => {
        const chatBox = document.getElementById("chat-container")
        chatBox.scrollTop = chatBox.scrollHeight
      }, [chats])

    const renderChat = chats.map((chat, index) => {
        if (chat.sender) {
            return <span key={index} className="p-2 rounded-3 text-white bg-dark d-flex align-self-end flex-wrap text-break shadow-secondary me-1" style={{ maxWidth: "75%" }}>{chat.message}</span>
        } else {
            return <span key={index} className="p-2 rounded-3 bg-white d-flex flex-wrap text-break shadow-secondary ms-1" style={{ maxWidth: "75%" }}>{chat.message}</span>
        }
    })
    return (
        <>
            <div className="h-75 w-100 d-flex flex-column align-items-start gap-3 overflow-y-scroll px-2 py-5 mb-4" id="chat-container">
                {renderChat}
                <form className="d-flex position-absolute" style={{ bottom: "40%", width: "95%" }} onSubmit={sendMessage}>
                    <input type="text" className="form-control shadow-main" value={message} onChange={handleFormChange} />
                    <button onClick={play} type="submit" className="btn button-hover text-white shadow-main" style={{ backgroundColor: "var(--third-color" }}>Send</button>
                </form>
            </div>
                <EmojiPicker
                    id="emoji-picker"
                    className="h-25 bg-dark"
                    width={"100%"}
                    onEmojiClick={(emojiObject) => handleEmojiSelect(emojiObject.emoji)}
                    searchDisabled={true}
                    lazyLoadEmojis={true}
                />
        </>
    )
}

export default Chat