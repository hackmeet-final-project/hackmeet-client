import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUserProfile } from "../store/actions/user/actionCreator"
import Navbar from "../components/Navbar"
import useSound from 'use-sound';
import openSound from "../audio/openSound.mp3"

const Lobby = () => {
    const dispatch = useDispatch()
    const [play, { stop }] = useSound(openSound);

    const profile = useSelector((state) => {
        return state.user.profile
    })

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])

    // console.log(profile)

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "100vh" }}>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center">
                <img src="https://i.imgur.com/P8Sv3Ek.png" className="w-25 mb-3 mt-3" />
            </div>
            <div className="d-flex flex-column" style={{ width: "20%" }}>
                <Link to="/leaderboard" type="button" onClick={play} className="btn rounded-1 m-2 shadow-secondary button-hover" style={{ backgroundColor: "var(--secondary-color)" }}>Leaderboard</Link>
                <Link to="/battle" type="button" onClick={play} className="btn rounded-1 m-2 shadow-secondary button-hover" style={{ backgroundColor: "var(--secondary-color)" }}>Find Match</Link>
            </div>
        </div>
    )
}

export default Lobby

