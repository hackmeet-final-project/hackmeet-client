import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSoal } from "../store/actionCreator"
import Timer from '../components/Timer'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import Media from "../components/Media"

const Leaderboard = () => {
    const [ready, setReady] = useState(false)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const mediaRef = useRef()
    const dispatch = useDispatch()
    const data = useSelector(state => {
      return state.soal.data
    })

    useEffect(() => {
      if(ready) {
        console.log(ready, 'from useEffect Battle ')
        dispatch(fetchSoal());
      }
    }, [ready])

    return (
      <div className="container-fluid w-100" style={{ height: "100vh" }}>
        <div className="container gap-3 py-5 d-flex h-100">
          <div className="d-flex flex-column gap-3 my-5 w-75 h-100 position-relative pb-4">
            <Timer ready={ready} setReady={setReady}/>
            <Media ref={mediaRef} ready={ready} setReady={setReady} message={message} setMessage={setMessage} chats={chats} setChats={setChats}/>
            <div className='d-flex' style={{height: '50%'}}>
              <div className="h-100 w-50 bg-dark shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-start-4" style={{border: '3px solid white'}}>
                  {ready ? <CodeEditor/> : 'Your Editor'}
              </div>
              <div className="h-100 w-50 shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-end-4 position-relative px-5" style={{border: '3px solid white', background: 'var(--secondary-color)'}}>
                <p className='text-dark fs-5' style={{textAlign: 'justify'}}>
                  {ready ? 
                  'Ini adalah soal yang sangat sulit tolong dikerjakan hati-hati' : 
                    <div className="position-relative d-flex align-items-center justify-content-center">
                      <span className="position-absolute display-1">?</span>
                      <i class="bi bi-cloud-fill text-white" style={{fontSize: '300px', textShadow: "3px 4px 10px rgba(0, 0, 0, 0.57)"}}>
                      </i>
                    </div> 
                  }
                </p>
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