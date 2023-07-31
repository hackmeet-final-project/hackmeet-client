import { useEffect, useState } from "react"


const MatchFound = ({hide, startCoding}) => {
    const [display, setDisplay] = useState("none")

    useEffect(() => {
        if(hide) {
            setDisplay("flex")
        } else {
            setDisplay("none")
        }
    }, [hide])

    return (
        <div className="container-fluid position-absolute" id="match-found-container" style={{display}}>
            <div className="d-flex justify-content-center align-items-center position-absolute" id="match-found">
                <h1 className="display-2 fw-bolder">{startCoding ? "Get Ready" : "Match Found"}</h1>
            </div>
        </div>
    )
}

export default MatchFound