import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import Timer from './Timer'
import io from "socket.io-client"
const socket = io('http://localhost:3000')
// const socket = io('https://hackmeet.kresnativ8.site')
const myPeer = new Peer()

const Media = () => {
    const [ready, setReady] = useState(false)
    const [peerId, setPeerId] = useState('')
    const [localStream, setLocalStream] = useState('')
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
          console.log(`user find match`, peerId)
          socket.emit("join-room", username, peerId)
        }
    } 
    useEffect(() => {
      myPeer.on("open", id => setPeerId(id))
      socket.on("timer-ready", () => {
        console.log('set timer')
        setReady(true)
      })
      socket.on("assign-room", room => {
        setRoom(room)
        console.log(username, `masuk ke room`,room)
      })
      navigator.mediaDevices.getUserMedia({ video:true, audio: true })
      .then(stream => {
          setLocalStream(stream)
          const myVideo = document.getElementById("local-video")
          myVideo.muted = true
          myVideo.srcObject = stream
          myVideo.onloadedmetadata = () => myVideo.play()
          console.log(username, `user ID`, peerId)

          myPeer.on("call", call => {
            console.log(`ada telpon masuk`, stream)
            call.answer(stream)
            call.on("stream", stream => {
                const remoteVideo = document.getElementById("remote-video")
                remoteVideo.srcObject = stream
                remoteVideo.onloadedmetadata = () => remoteVideo.play()
            })
          })
      })
    }, [])

    useEffect(() => {
      if(localStream) {
        socket.on("call-user", (peerID) => {
            if(peerID !== peerId) {
              const call = myPeer.call(peerID, localStream)
              call.on("stream", stream => {
                  const remoteVideo = document.getElementById("remote-video")
                  remoteVideo.srcObject = stream
                  remoteVideo.onloadedmetadata = () => remoteVideo.play()
                })
              socket.emit("start-timer", peerID)
              }
        })
      }
    }, [localStream])
    
    return (
      <div className="container mt-5 py-3">
        <div className="d-flex gap-3 mt-5" style={{height: '400px'}}>
        <Timer ready={ready} setReady={setReady}/>
            <div className="h-100 w-50 bg-dark shadow-button rounded-4 d-flex align-items-center justify-content-center" style={{border: '3px solid white'}}>
                <video src="" id="local-video"  className='h-100'></video>
              </div>
              <div className="h-100 w-50 bg-dark shadow-button rounded-4 d-flex align-items-center justify-content-center" style={{border: '3px solid white'}}>
                <video src="" id="remote-video" className='h-100'></video>
              </div>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-primary" onClick={handleFindMatch}>Find Match</button>
          <button className="btn btn-danger">Leave</button>
        </div>
      </div>
    )
}

export default Media