import { useContext } from "react"
import ShakeContext from "../context/ShakeContext"

const Disaster = ({setShake}) => {
    const { shake } = useContext(ShakeContext)

    const geter = () => {
        if(shake) {
            setShake(false)
        } else {
            setShake(true)
        }
    }
    
    return (
        <div className="d-flex align-items-center justify-content-center position-absolute" style={{bottom: 0, right: "50%", transform: "translate(50%, 50%)", height: "12vh", width: "12vh", zIndex: 1001}}>
            <img onClick={geter} src="https://cdn.discordapp.com/attachments/1131882116976742410/1135969769607151687/dontpress-removebg-preview.png" style={{height: "12vh", width: "12vh", zIndex: 9999, cursor: "pointer"}} id="dont-press"/>
        </div>
    )
}

export default Disaster