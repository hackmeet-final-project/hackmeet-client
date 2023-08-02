import { useEffect, useRef, useState } from "react"

const Stopwatch = ({finding}) => {
    const [time, setTime] = useState(0)
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
        if (finding) {
            console.log(`stop watch jalan`)
            stopwatch.current = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        } else {
            clearInterval(stopwatch.current)
        }
    }, [finding])

    return (
        <h3 className="text-white ms-3">{formatTime(time)}</h3>
    )
}

export default Stopwatch