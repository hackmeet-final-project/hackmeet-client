import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUserProfile } from "../store/actions/user/actionCreator"

const Lobby = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state) => {
        return state.user.profile
    })

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])

    // console.log(profile)

    return (
        <div  style={{ height: "100vh" }}>
            <div className="d-flex justify-content-between">
                <div className="p-5 flex-column">
                    <h3 className=" fw-bold text-muted">username: {profile.firstName}</h3>
                    <h3  className=" fw-bold text-muted">MMR: {profile.mmr}</h3>    
                </div>
                <h5 className="p-5 fw-bold text-muted"> <i className="bi bi-circle-fill text-success"></i> Total Online: 100 <i className="bi bi-person-fill"></i></h5>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="d-flex justify-content-center align-items-center">
                    <img src="https://i.imgur.com/w5QcAxK.png" className="w-25" />
                </div>
                <div className="d-flex flex-column" style={{ width: "20%" }}>
                    <Link to="/leaderboard" type="button" className="btn rounded-1 m-2 shadow-secondary button-hover" style={{ backgroundColor: "var(--secondary-color)" }}>Leaderboard</Link>
                    <Link to="/battle" type="button" className="btn rounded-1 m-2 shadow-secondary button-hover" style={{ backgroundColor: "var(--secondary-color)" }}>Find Match</Link>
                </div>
            </div>
        </div>
    )
}

export default Lobby

