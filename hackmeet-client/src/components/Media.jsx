import { useState, useEffect, forwardRef, useImperativeHandle, useContext } from "react"
import { Peer } from "peerjs"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateMMR } from "../store/actions/user/actionCreator"
import socket from "../config/socket"
import Disaster from "./Disaster"
import ShakeContext from "../context/ShakeContext"

const Media = forwardRef(({ ready, setReady, message, setMessage, chats, setChats, setCoding, setGenerateCode}, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleFindMatch,
      sendMessage,
      handleLeaveMatch,
      handleGameDraw,
      handleSetWinner
    }
  })
    const { animationName, animationCount, setShake, shake } = useContext(ShakeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState(Math.random() * 10)
    const [localStream, setLocalStream] = useState('')
    const [peerId, setPeerId] = useState('')
    const [room, setRoom] = useState('')
    const [myPeer] = useState(new Peer())
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
        setReady(false)
        socket.emit("join-room", username, peerId)
      }
    }
    const handleLeaveMatch = () => {
      if(room) {
        myPeer.destroy()
        socket.emit("user-leave-room", room)
      }
      navigate("/lobby")
    }

    const handleGameDraw = () => {
      socket.emit("draw", room)
    }

    const handleSetWinner = () => {
      socket.emit("winner", room, peerId)
    }

    // useEffect 
    useEffect(() => {
      myPeer.on("open", id => {
        setPeerId(id)
      })

      socket.on("assign-room", battleRoom => {
          setRoom(battleRoom)
      })

      socket.on("set-ready", () => {
        console.log(`setReady`)
        setReady(true)
      })

      socket.on("receive-message", message => {
        setChats(prev => {
          return prev = [...prev, {message, sender: false}]
        })
      })
      socket.on("draw-result", () => {
        dispatch(updateMMR("-10"))
        setRoom('')
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
              console.log(call.peer)
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

      window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if(room) {
          socket.emit("user-leave-room", room) 
        }
      };
      return () => {socket.removeAllListeners()}
    }, [])

    useEffect(() => {
      if(localStream) {
        console.log(peerId)
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
      if(peerId) {
        socket.on("winner-result", (winner) => {
          setGenerateCode(false)
          setCoding(false)
          setRoom('')
          if(peerId === winner) {
            dispatch(updateMMR("+20"))
          } else {
            dispatch(updateMMR("-20"))
          }
        })
      }
      return () => {socket.removeAllListeners("winner-result")}
    }, [peerId])

    useEffect(() => {
      if(shake) {
        socket.emit("send-shake", room, true)
      } else {
        socket.emit("send-shake", room, false)
      }

      socket.on("receive-shake", shake => {
        setShake(shake)
      })

      return () => {
        socket.removeAllListeners()
      }
    }, [shake])
    return (
      <div className='d-flex gap-2 position-relative' style={{height: '40%', animation: animationName, animationIterationCount: animationCount, zIndex: 1000}}>
        <Disaster setShake={setShake}/>
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