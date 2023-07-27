import React, { useRef } from "react"
import { useState, useEffect } from 'react'

const Timer = ({seconds}) => {
  const [timer, setTimer] = useState(seconds)
  const timerId = useRef()

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if(timer <= 0) {
      clearInterval(timerId.current)
      console.log("timer done")
    }
  }, [timer])



  return (
    <div>
      <h1>Timer: {timer} detik</h1>
    </div>
  )
}

export default Timer
