import { useState, useRef, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSoal, generateQuestion } from '../store/actions/question/actionCreator'
import Timer from '../components/Timer'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import Media from "../components/Media"
import MatchFound from "../components/MatchFound"
import useSound from 'use-sound';
import popSound from "../audio/popSound.mp3"
import openSound from "../audio/openSound.mp3"
import ShakeContext from "../context/ShakeContext"

const Battle = () => {
  const  {animationName, animationCount} = useContext(ShakeContext)
  const [play] = useSound(popSound);
  const [play2] = useSound(openSound);
  const [ready, setReady] = useState(false)
  const [generateCode, setGenerateCode] = useState(false)
  const [startCoding, setStartCoding] = useState(false)
  const [coding, setCoding] = useState(false)
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([])
  const [hide, setHide] = useState(false)
  const mediaRef = useRef()
  const dispatch = useDispatch()
  
  const profile = useSelector((state) => {
    return state.user.profile
  })

  const question = useSelector(state => {
    return state.soal.question
  })
    const getDraw = () => {
      setGenerateCode(false)
      mediaRef.current.handleGameDraw()
    }

    const getWinner = () => {
      mediaRef.current.handleSetWinner()
    }

    useEffect(() => {
      if(ready) {
        dispatch(fetchSoal())
        .then(soal => {
          const generateNumber = Math.floor(Math.random() * soal.length)
          dispatch(generateQuestion(generateNumber))
          setGenerateCode(true)
          setHide(true)
          setTimeout(() => {
            setStartCoding(true)
          }, 2000)
          setTimeout(() => {
            setHide(false)
          }, 7000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [ready])

    return (
      <div className="container-fluid w-100 px-5" style={{ height: "100vh", animation: animationName, animationIterationCount: animationCount}}>
        <MatchFound hide={hide} startCoding={startCoding}/>
        <div className="gap-3 py-5 d-flex h-100 px-5">
          <div className="d-flex flex-column gap-3 w-75 h-100 position-relative">
            <Timer coding={coding} setCoding={setCoding} startCoding={startCoding} setStartCoding={setStartCoding} getDraw={getDraw}/>
            <Media ref={mediaRef} ready={ready} setReady={setReady} message={message} setMessage={setMessage} chats={chats} setChats={setChats} setGenerateCode={setGenerateCode} setCoding={setCoding}/>
            <div className='d-flex flex-column justify-content-center' style={{height: '100%'}}>
              <div className="h-25 w-100 shadow-main d-flex align-items-center justify-content-center overflow-hidden rounded-top-4 position-relative px-5" style={{border: '3px solid white', background: 'var(--secondary-color)'}}>
                    {generateCode ? 
                      <p className='text-dark fs-5' style={{textAlign: 'justify', marginRight: "220px"}}>
                        {question}
                      </p> 
                      : 
                      <div className="position-relative d-flex align-items-center justify-content-center">
                        <i className="bi bi-question position-absolute display-1"></i>
                        <i className="bi bi-cloud-fill text-white" style={{fontSize: '120px', textShadow: "3px 4px 10px rgba(0, 0, 0, 0.57)"}}></i>
                      </div> 
                    }
                  {/* button */}
                <div className="d-flex position-absolute gap-1 h-100 py-3" style={{ width: "230px", top: 0, right: 10 }}>
                  <button className="btn w-50 shadow-main text-dark button-hover fw-bold" style={{ backgroundColor: "var(--primary-color)" }} onClick={() => {
                    mediaRef.current.handleFindMatch();
                    play2()
                    }}>Find Match</button>
                  <button className="btn w-50 shadow-main text-dark button-hover fw-bold" style={{ backgroundColor: "var(--fourth-color)" }} onClick={() => {
                    mediaRef.current.handleLeaveMatch();
                    play()
                  }}>Leave</button>
                </div>
                {/* button end */}
              </div>
              <div className="h-75 w-100 shadow-main d-flex flex-column align-items-center justify-content-center overflow-hidden rounded-bottom-4 bg-white" style={{border: '3px solid white', boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"}}>
                {generateCode ? <CodeEditor getWinner={getWinner} generateCode={generateCode} coding={coding}/> : ""}
              </div>

          </div>
        </div>
        <div className="w-25 h-100 shadow-main rounded-4 d-flex flex-column align-items-center justify-content-center overflow-hidden position-relative" style={{ border: '3px solid white', backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
          <Chat setMessage={setMessage} message={message} chats={chats} sendMessage={(event) => mediaRef.current.sendMessage(event)} />
        </div>
      </div>
    </div>
  )
}

export default Battle
