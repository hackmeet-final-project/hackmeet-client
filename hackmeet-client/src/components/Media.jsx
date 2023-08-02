import { useState, useEffect, forwardRef, useImperativeHandle, useContext } from "react"
import { Peer } from "peerjs"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateMMR } from "../store/actions/user/actionCreator"
import { useToast } from "@chakra-ui/react"
import socket from "../config/socket"
import Disaster from "./Disaster"
import ShakeContext from "../context/ShakeContext"
import Stopwatch from "./Stopwatch"

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
    const Toast = useToast()
    const { animationName, animationCount, setShake, shake } = useContext(ShakeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [peerId, setPeerId] = useState("")
    const [finding, setFinding] = useState(false)
    const [localStream, setLocalStream] = useState('')
    const [room, setRoom] = useState('')
    const [myPeer] = useState(new Peer())
    const username = useSelector(state => {
      return state.user.profile.firstName
    }) 
    const sendMessage = (event) => {
      event.preventDefault()
        if(message) {
          socket.emit("send-message", message, room)
          setChats([...chats, {message, sender: true}])
        }
      setMessage('')
    }
    const handleFindMatch = () => {
      if(!room) {
        setFinding(true)
        setReady(false)
        console.log(peerId)
        socket.emit("join-room", username, peerId)
      } else {
        setGenerateCode(false)
        setFinding(false)
        setReady(false)
        socket.emit("user-leave-room", room)
        setRoom('')
      }
    }
    const handleLeaveMatch = () => {
      if(room) {
        myPeer.destroy()
        socket.emit("user-leave-room", username, peerId)
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
          console.log(username, "masuk ke room", battleRoom)
          setRoom(battleRoom)
      })

      socket.on("set-ready", () => {
        setReady(true)
        setFinding(false)
      })

      socket.on("receive-message", message => {
        setChats(prev => {
          return prev = [...prev, {message, sender: false}]
        })
      })
      socket.on("draw-result", () => {
        Toast({
          position: "top",
          title: "Timer Out",
          description: "Its A Draw !",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        dispatch(updateMMR("-10"))
        setCoding(false)
      })

      socket.on("room-deleted", () => {
        const remoteVideo = document.getElementById("remote-video")
          if(remoteVideo.srcObject) {
            remoteVideo.srcObject.getTracks().forEach(track => {
             track.enabled = false
           })
          }
          console.log("user meninggalkan room", room)
          setGenerateCode(false)
          setCoding(false)
          setRoom('')
      })

      navigator.mediaDevices.getUserMedia({ video:true, audio: true })
      .then(stream => {
          setLocalStream(stream)
          const myVideo = document.getElementById("local-video")
          myVideo.muted = true
          myVideo.srcObject = stream
          myVideo.onloadedmetadata = () => myVideo.play()

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
        socket.on("call-user", (peerID) => {
          if(peerID !== peerId) {
            console.log(`ada telpon dari`, peerID)
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
          setCoding(false)
          if(peerId === winner) {
            dispatch(updateMMR("+20"))
            Toast({
              position: "top",
              title: "You Won",
              description: "See you again!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          } else {
            dispatch(updateMMR("-20"))
            Toast({
              position: "top",
              title: "You Lose",
              description: "Better luck next time!",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
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

    useEffect(() => {
      if(finding) {
        const remoteVideo = document.getElementById("remote-video")
          if(remoteVideo.srcObject) {
            remoteVideo.srcObject.getTracks().forEach(track => {
             track.enabled = false
           })
          }
      }
    }, [finding])
    return (
      <div className='d-flex gap-2 position-relative' style={{height: '40%', animation: animationName, animationIterationCount: animationCount, zIndex: 1000}}>
        <Disaster setShake={setShake}/>
        <div className="d-flex h-100 w-50 bg-dark shadow-main rounded-4  align-items-center justify-content-center overflow-hidden" style={{border: '3px solid white'}}>
          <video src="" id="local-video"  className='w-100'></video>
        </div>
        <div className="d-flex h-100 w-50 bg-dark shadow-main rounded-4 align-items-center justify-content-center overflow-hidden position-relative" style={{border: '3px solid white'}}>
          {finding &&  <img src="https://cdn.discordapp.com/attachments/1131882116976742410/1134404760036966410/hecktivwarsOrab.png" className="img-shake position-absolute" style={{width: "70%", animation: "shake 0.5s", animationIterationCount: "infinite"}}/>}
          {finding && <span className="text-white position-absolute fs-4 d-flex top-0 mt-3" style={{zIndex: 2}}>Finding match... <Stopwatch finding={finding}/></span>}
          <video src="" id="remote-video" className='w-100'></video>
        </div>
      </div>
    )
})

export default Media