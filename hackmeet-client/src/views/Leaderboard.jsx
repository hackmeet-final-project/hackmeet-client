import { useState, useRef, useEffect } from "react"
import Timer from '../components/Timer'
import Chat from '../components/Chat'
import BattleUI from '../components/BattleUI'
import Media from "../components/Media"

const Leaderboard = () => {
    const [ready, setReady] = useState(false)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const mediaRef = useRef()

    return (
      <div className="container-fluid w-100" style={{ height: "100vh" }}>
        <div className="container gap-3 py-5 d-flex h-100">
          <div className="d-flex flex-column gap-3 my-5 w-75 h-100 position-relative pb-4">
            <Timer ready={ready} setReady={setReady}/>
            <Media ref={mediaRef} setReady={setReady} message={message} setMessage={setMessage} chats={chats} setChats={setChats}/>
            <div className='d-flex' style={{height: '45%'}}>
              <div className="h-100 w-50 bg-dark shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-start-4" style={{border: '3px solid white'}}>
                  <BattleUI/>
              </div>
              <div className="h-100 w-50 shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-end-4 position-relative px-5" style={{border: '3px solid white', background: 'var(--secondary-color)'}}>
                <p className='text-dark fs-5' style={{textAlign: 'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci enim quo, eaque labore, necessitatibus cum, nobis porro sunt cumque animi praesentium. Perspiciatis vel velit officiis.</p>
                <div className="d-flex position-absolute gap-1" style={{width: "220px", bottom: 10, right: 5}}>
                  <button className="btn w-50 shadow-main text-dark button-hover" style={{backgroundColor: "var(--primary-color)"}} onClick={() => mediaRef.current.handleFindMatch()}>Find Match</button>
                  <button className="btn w-50 shadow-main text-dark button-hover" style={{backgroundColor: "var(--fourth-color)"}}>Leave</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-25 shadow-main rounded-4 my-5 d-flex align-items-center justify-content-center p-2 position-relative" style={{border: '3px solid white', backgroundColor: "rgba(255, 255, 255, 0.3)"}}>
            <Chat setMessage={setMessage} message={message} chats={chats} sendMessage={(event) => mediaRef.current.sendMessage(event)}/>
          </div>
        </div>
      </div>
    )
}

export default Leaderboard