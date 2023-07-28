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
            socket.emit("join-room", username, peerId)
            navigator.mediaDevices.getUserMedia({ video:true, audio: true })
            .then(stream => {
                setLocalStream(stream)
                const myVideo = document.getElementById("local-video")
                myVideo.muted = true
                myVideo.srcObject = stream
                myVideo.onloadedmetadata = () => myVideo.play()
            })
        }
    } 
    useEffect(() => {
      socket.on("timer-ready", () => {
        setReady(true)
      })
    }, [])

    useEffect(() => {
      myPeer.on("open", id => setPeerId(id))

      if(peerId) {
        socket.on("assign-room", (room, peerID) => {
            setRoom(room)
            if(peerId !== peerID) {
                setTimeout(() => {
                  const call =  myPeer.call(peerID, localStream)
                  call.on("stream", stream => {
                      const remoteVideo = document.getElementById("remote-video")
                      remoteVideo.srcObject = stream
                      remoteVideo.onloadedmetadata = () => remoteVideo.play()
                      socket.emit("start-timer", room)
                  })
                }, 1000)
            }
      })
      myPeer.on("call", call => {
        call.answer(localStream)
        call.on("stream", stream => {
            const remoteVideo = document.getElementById("remote-video")
            remoteVideo.srcObject = stream
            remoteVideo.onloadedmetadata = () => remoteVideo.play()
        })
      })
    }
    }, [localStream])
    
    return (
      <div className="container mt-5">
        <div className="d-flex gap-3">
          <button className="btn btn-primary" onClick={handleFindMatch}>Find Match</button>
          <button className="btn btn-danger">Leave</button>
        </div>
        <div className="d-flex gap-3 mt-5" style={{height: '500px'}}>
        <Timer ready={ready} setReady={setReady}/>
            <div className="h-100 w-50 bg-dark shadow-button rounded-4 d-flex align-items-center" style={{border: '3px solid white'}}>
                <video src="" id="local-video"  className='w-100'></video>
              </div>
              <div className="h-100 w-50 bg-dark shadow-button rounded-4 d-flex align-items-center" style={{border: '3px solid white'}}>
                <video src="" id="remote-video" className='w-100'></video>
              </div>
        </div>
       
      </div>
    )
}

export default Media