import { useState, useEffect, useRef } from 'react'

const TimerSecond = ({seconds, coding, setCoding, startCoding, setStartCoding, getDraw }) => {
  const [timer, setTimer] = useState(seconds)
  const timerId = useRef()

  const formatTime = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes < 10) {
      minutes = "0" + minutes
    } 
    if(seconds < 10) {
      seconds = "0" + seconds
    }
    return minutes + ":" + seconds
  }
  
  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if(timer <= 0) {
      clearInterval(timerId.current)
      if(startCoding) {
        setStartCoding(false)
        setCoding(true)
      }

      if(coding) {
        console.log(`dari timer <<<<<<<`)
        setCoding(false)
        getDraw()
      }
      console.log("timer done")
    }
  }, [timer])

  return (
    <div>
      <h1>{formatTime(timer)}</h1>
    </div>
  )
}

export default TimerSecond
