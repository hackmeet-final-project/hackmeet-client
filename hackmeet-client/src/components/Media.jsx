import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import { io } from "socket.io-client"
import { Peer } from "peerjs"
import Timer from './Timer'
import Chat from './Chat'
import BattleUI from "./BattleUI";
const socket = io('http://localhost:3000')
// const socket = io('https://hackmeet.kresnativ8.site')
const myPeer = new Peer()

const Media = () => {
    const [ready, setReady] = useState(false)
    const [peerId, setPeerId] = useState('')
    const [localStream, setLocalStream] = useState('')
    const {username} = useParams()
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const [room, setRoom] = useState('')
   
    const sendMessage = (event) => {
        event.preventDefault()
        if(message) {
          socket.emit("send-message", message, room)
          setChats([...chats, {message, sender: true}])
          setMessage('')
        }
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
        setReady(true)
      })

      socket.on("assign-room", room => {
        setRoom(room)
        console.log(username, `masuk ke room`,room)
      })

      socket.on("receive-message", message => {
        setChats(prev => {
          return prev = [...prev, {message, sender: false}]
        })
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
      <div className="container gap-3 py-5 d-flex h-100">
        <div className="d-flex flex-column gap-3 my-5 w-75 h-100 position-relative pb-4">
          <Timer ready={ready} setReady={setReady}/>
          
          <div className='d-flex gap-2'style={{height: '45%'}}>
            <div className="h-100 w-50 bg-dark shadow-main rounded-4 d-flex align-items-center justify-content-center overflow-hidden" style={{border: '3px solid white'}}>
              <video src="" id="local-video"  className='w-100'></video>
            </div>
            <div className="h-100 w-50 bg-dark shadow-main rounded-4 d-flex align-items-center justify-content-center overflow-hidden" style={{border: '3px solid white'}}>
              <video src="" id="remote-video" className='w-100'></video>
            </div>
          </div>
          <div className='d-flex' style={{height: '45%'}}>
            <div className="h-100 w-50 bg-dark shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-start-4" style={{border: '3px solid white'}}>
                <BattleUI />
            </div>
            <div className="h-100 w-50 shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-end-4 position-relative px-5" style={{border: '3px solid white', background: 'var(--secondary-color)'}}>
              <p className='text-dark fs-5' style={{textAlign: 'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci enim quo, eaque labore, necessitatibus cum, nobis porro sunt cumque animi praesentium. Perspiciatis vel velit officiis.</p>
              <div className="d-flex position-absolute gap-1" style={{width: "220px", bottom: 10, right: 5}}>
                <button className="btn w-50 shadow-main text-dark button-hover" onClick={handleFindMatch} style={{backgroundColor: "var(--primary-color)"}}>Find Match</button>
                <button className="btn w-50 shadow-main text-dark button-hover" style={{backgroundColor: "var(--fourth-color)"}}>Leave</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-25 shadow-main rounded-4 my-5 d-flex align-items-center justify-content-center p-2 position-relative" style={{border: '3px solid white', backgroundColor: "rgba(255, 255, 255, 0.3)"}}>
           <Chat sendMessage={sendMessage} setMessage={setMessage} message={message} chats={chats}/>
        </div>
      </div>
    )
}

export default Media