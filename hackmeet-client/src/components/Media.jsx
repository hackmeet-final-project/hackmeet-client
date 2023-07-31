import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { io } from "socket.io-client"
import { Peer } from "peerjs"
import { useNavigate } from "react-router-dom"

// const socket = io('https://hackmeet.kresnativ8.site')

const powerUp = [
  "earthquake",
  "freeze",
  "joker"
]

const Media = forwardRef(({ ready, setReady, message, setMessage, chats, setChats}, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleFindMatch,
      sendMessage,
      handleLeaveMatch
    }
  })
    const navigate = useNavigate()
    const [username, setUsername] = useState(Math.random() * 10)
    const [localStream, setLocalStream] = useState('')
    const [peerId, setPeerId] = useState('')
    const [room, setRoom] = useState('')
    const [myPeer] = useState(new Peer())
    const [socket] = useState(io('http://localhost:3000'))
   
    const sendMessage = (event) => {
      event.preventDefault()
        if(ready && message) {
          socket.emit("send-message", message, room)
          setChats([...chats, {message, sender: true}])
        }
      setMessage('')
    }
    const handleFindMatch = () => {
      if(!room) {
        console.log(`user find match`, peerId, 'from handleFindMatch')
        socket.emit("join-room", username, peerId)
      }
    }
    const handleLeaveMatch = () => {
      if(room) {
        myPeer.destroy()
        socket.emit("user-leave-room", room)
        socket.close()
      }
      navigate("/lobby")
    }

    useEffect(() => {
      myPeer.on("open", id => {
        setPeerId(id)
      })

      socket.on("assign-room", battleRoom => {
        if(!room) {
          console.log(battleRoom, "ini yang di masukin", username)
          setRoom(battleRoom)
        }
      })

      socket.on("set-ready", () => {
        setReady(true)
      })

      socket.on("receive-message", message => {
        setChats(prev => {
          return prev = [...prev, {message, sender: false}]
        })
      })
      socket.on("room-deleted", () => {
        setRoom('')
      })
      navigator.mediaDevices.getUserMedia({ video:true, audio: true })
      .then(stream => {
          setLocalStream(stream)
          const myVideo = document.getElementById("local-video")
          myVideo.muted = true
          myVideo.srcObject = stream
          myVideo.onloadedmetadata = () => myVideo.play()
          console.log(username, `user ID`, 'from navigator.mediaDevices')

          myPeer.on("call", call => {
            console.log(`ada telpon masuk`, stream, 'from myPeer.on call navigator')
            call.answer(stream)
            if(call.open) {
              socket.emit("players-ready", myPeer.id)
            }
            call.on("stream", stream => {
                const remoteVideo = document.getElementById("remote-video")
                remoteVideo.srcObject = stream
                remoteVideo.muted = true
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
                remoteVideo.muted = true
                remoteVideo.onloadedmetadata = () => remoteVideo.play()
            })
            
          }
        })
      }
    }, [peerId])

    window.onbeforeunload = (event) => {
      const e = event || window.event;
      e.preventDefault();
      if(room) {
        socket.emit("user-leave-room", room) 
      }
      
      return socket.close()
    };
    return (
      <div className='d-flex gap-2'style={{height: '40%'}}>
        <div className="h-100 w-50 bg-dark shadow-main rounded-4 d-flex align-items-center justify-content-center overflow-hidden" style={{border: '3px solid white'}}>
          <video src="" id="local-video"  className='w-100'></video>
        </div>
        <div className="h-100 w-50 bg-dark shadow-main rounded-4 d-flex align-items-center justify-content-center overflow-hidden" style={{border: '3px solid white'}}>
          <video src="" id="remote-video" className='w-100'></video>
        </div>
      </div>
    )
})

export default Media