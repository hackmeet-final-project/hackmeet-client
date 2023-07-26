import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import io from "socket.io-client"
const socket = io('http://localhost:3000/')



const Media = () => {
    const {username} = useParams()
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('')
    const handleFormChange = (event) => {
        setMessage(event.target.value)
      }
    const sendMessage = (event) => {
        event.preventDefault()
        console.log(message)
        setMessage('')
      }
    const handleFindMatch = () => {
        if(!room) {
            socket.emit("join-room", username)
        }
    } 
    useEffect(() => {
        socket.on("assign-room", room => {
            setRoom(room)
            console.log(room)
        })
    }, [])
    
    return (
      <div className="container mt-5">
        <h1>Test Stream App Total user =  </h1>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-primary" onClick={handleFindMatch}>Find Match</button>
          <button className="btn btn-outline-danger">Leave</button>
        </div>
        <div className="d-flex gap-3 mt-5" style={{height: '500px'}}>
        <div className="h-100 w-50 bg-dark">
            <video src="" id="video-1"></video>
          </div>
          <div className="h-100 w-50 bg-dark" >
            <video src="" id="video-2"></video>
          </div>
        </div>
        <form className="mt-5 d-flex gap-3" onSubmit={sendMessage}>
          <div>
            <input type="text" className="form-control" placeholder="type your message"
              name="message"
              value={message}
              onChange={handleFormChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">Send</button>
        </form>

      </div>
    )
}

export default Media