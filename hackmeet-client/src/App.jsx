import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ShakeContext from "./context/ShakeContext"

const App = () => {
  const [shake, setShake] = useState(false)
  const [animationName, setAnimationName] = useState("")
  const [animationCount, setAnimationCount] = useState("")
  const [background,setBackground] = useState("")

  useEffect(() => {
    if(shake) {
        setAnimationName("shake 0.5s")
        setAnimationCount("infinite")
        setBackground("brown")
    } else {
        setAnimationName("")
        setAnimationCount("")
        setBackground("")
    }
  }, [shake])

  return (
    <ShakeContext.Provider value={{shake, setShake, animationCount, animationName}}>
    <Outlet/>
    <div id="background-wrap" style={{animation: animationName, animationIterationCount: animationCount, backgroundColor: background}}>
        <div className="x1">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x2">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x3">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}} ></div>
        </div>
        <div className="x4">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x5">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x2">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x1">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x3">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x4">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
        <div className="x5">
            <div className="cloud" style={{animation: animationName, animationIterationCount: animationCount}}></div>
        </div>
    </div>
    </ShakeContext.Provider>
  )
}

export default App