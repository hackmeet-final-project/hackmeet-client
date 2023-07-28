import { useState, useEffect } from "react";
import TimerSecond from "./TimerSecond";

const Timer = ({ready, setReady}) => {
    const [coding, setCoding] = useState(false)
    const [startTimer, setStartTimer] = useState(false)

    useEffect(() => {
        if (ready) {
            setStartTimer(true)
        }
    }, [ready])



    return (
        <div className="d-flex justify-content-center align-items-center rounded-3 position-absolute border border-black shadow-button" style={{backgroundColor: '#EAC787', minHeight: "5vh", minWidth: "6vw", right: "50%", transform: "translate(50%, -50%)"}}>
            {ready || coding ? '' : <h1>00:00</h1>}
            {ready && (<TimerSecond seconds={3} startTimer={true} ready={ready} setReady={setReady} coding={coding} setCoding={setCoding} />)}
            {coding && (<TimerSecond seconds={90} startTimer={startTimer} ready={ready} setReady={setReady} coding={coding} setCoding={setCoding}/>)}
        </div>
    )
}

export default Timer
