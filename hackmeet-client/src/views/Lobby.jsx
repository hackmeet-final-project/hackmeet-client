import { useState, useEffect } from "react";
import Timer from "../components/Timer";

const Lobby = () => {
    const [ready, setReady] = useState(false)
    const [coding, setCoding] = useState(false)
    const [startTimer, setStartTimer] = useState(false)

    const handleStartMatch = () => {
        setReady(true)
    }

    useEffect(() => {
        if (ready) {
            setStartTimer(true)
            setTimeout(() => {
                setCoding(true)
            }, 10000)
        }
    }, [ready])

    const handleTimerFinish = () => {
        setStartTimer(false)
    }

    console.log("ready: " + ready)
    console.log("coding: " + coding)
    console.log("timerstart: " + startTimer)

    return (
        <>
            <h1>Lobby</h1>
            <button onClick={handleStartMatch}>Start Match</button>

            {ready && !coding && (
                <>
                    <h1>Match found, get ready !</h1>
                    <Timer seconds={10} startTimer={true}/>
                </>
            )}

            {coding && (
                <>
                    <h1>Gas battle</h1>
                    <Timer seconds={10} startTimer={startTimer} onFinish={handleTimerFinish} />
                </>
            )}
        </>
    )
}

export default Lobby
