import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { io } from "socket.io-client"
import { Peer } from "peerjs"
const socket = io('http://localhost:3000')
// const socket = io('https://hackmeet.kresnativ8.site')
const myPeer = new Peer()

const Media = forwardRef(({ message, setMessage, chats, setChats, setReady}, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleFindMatch,
      sendMessage
    }
  })
    let username = Math.random() * 100
    const [localStream, setLocalStream] = useState('')
    const [peerId, setPeerId] = useState('')
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
      <div className='d-flex gap-2'style={{height: '45%'}}>
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