import { useState, useEffect, useRef } from 'react'

const Timer = ({seconds, startTimer, onFinish}) => {
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
  }, [startTimer])

  useEffect(() => {
    if(timer <= 0) {
      clearInterval(timerId.current)
      console.log("timer done")
    }
  }, [timer, onFinish])



  return (
    <div>
      <h1>Timer: {formatTime(timer)} detik</h1>
    </div>
  )
}

export default Timer
