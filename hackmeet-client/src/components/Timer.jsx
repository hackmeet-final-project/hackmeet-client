import { useState, useEffect } from "react";
import TimerSecond from "./TimerSecond";

const Timer = ({coding, setCoding, startCoding, setStartCoding, getDraw}) => {
    const [startTimer, setStartTimer] = useState(false)

    useEffect(() => {
        if (startCoding) {
            console.log(startCoding, "dari timer js")
            setStartTimer(true)
        }
    }, [startCoding])



    return (
        <div className="d-flex justify-content-center align-items-center rounded-3 position-absolute border border-black shadow-main" style={{backgroundColor: '#EAC787', minHeight: "5vh", minWidth: "6vw", right: "50%", transform: "translate(50%, -50%)", zIndex: 9999}}>
            {startCoding || coding ? '' : <h1>00:00</h1>}
            {startCoding && (<TimerSecond seconds={5} startTimer={true} startCoding={startCoding} setStartCoding={setStartCoding} coding={coding} setCoding={setCoding} />)}
            {coding && (<TimerSecond seconds={90} startTimer={startTimer} startCoding={startCoding} setStartCoding={setStartCoding} coding={coding} setCoding={setCoding} getDraw={getDraw}/>)}
        </div>
    )
}

export default Timer
