import { useEffect, useRef, useState } from "react"

const Stopwatch = () => {
    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(true)
    const stopwatch = useRef()

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time - minutes * 60)

        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return minutes + ":" + seconds
    }

    useEffect(() => {
        if (running) {
            stopwatch.current = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        } else {
            clearInterval(stopwatch.current)
            setRunning(false)
        }
    }, [running])

    return (
        <h1>{formatTime(time)}</h1>
    )
}

export default Stopwatch