import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUserProfile } from "../store/actions/user/actionCreator"
import Navbar from "../components/Navbar"
import useSound from 'use-sound';
import openSound from "../audio/openSound.mp3"

const Lobby = () => {
    const dispatch = useDispatch()
    const [play] = useSound(openSound);

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
                <img src="https://i.imgur.com/P8Sv3Ek.png" className="mb-3 mt-3" style={{width: "50%"}}/>
            </div>
            <div className="d-flex flex-column" style={{ width: "22%", height: "20%" }}>
                <Link to="/leaderboard" type="button" onClick={play} className="d-flex align-items-center justify-content-center btn rounded-5 m-2 shadow-secondary h-50 naik" style={{ backgroundColor: "var(--secondary-color)" }}>
                    <span className="fs-4">Leaderboard</span>
                </Link>
                <Link to="/battle" type="button" onClick={play} className="d-flex align-items-center justify-content-center btn rounded-5 m-2 shadow-secondary h-50 naik" style={{ backgroundColor: "var(--secondary-color)" }}>
                    <span className="fs-4">Battle</span>
                </Link>
            </div>
        </div>
    )
}

export default Lobby

