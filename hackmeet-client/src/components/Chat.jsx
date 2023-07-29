import { useState } from "react"


const Chat = () => {
    const [message, setMessage] = useState('')
    const handleFormChange = (event) => {
        setMessage(event.target.value)
    }
    return (
        <div className="h-100 w-100 bg-dark">
            <form>
                
            </form>
        </div>
    )
}

export default Chat