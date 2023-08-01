import { useEffect, useState } from "react"
import useSound from 'use-sound';
import drumSound from "../audio/drumSound.mp3"

const MatchFound = ({hide, startCoding}) => {
    const [display, setDisplay] = useState("none")
    const [play] = useSound(drumSound);

    useEffect(() => {
        if(hide) {
            setDisplay("flex")
            play()
        } else {
            setDisplay("none")
        }
    }, [hide])

    return (
        <div className="container-fluid position-absolute" id="match-found-container" style={{display, zIndex: 1020}}>
            <div className="d-flex justify-content-center align-items-center position-absolute" id="match-found">
                <h1 className="display-2 fw-bolder">{startCoding ? "Get Ready" : "Match Found"}</h1>
            </div>
        </div>
    )
}

export default MatchFound