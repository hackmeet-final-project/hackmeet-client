import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "../store/actions/user/actionCreator"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import useSound from 'use-sound';
import popSound from "../audio/popSound.mp3"
import ProfileIcon from "./ProfileIcon"


const Navbar = () => {
    const toast = useToast()
    const [play] = useSound(popSound);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profile = useSelector((state) => {
        return state.user.profile
    })

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])
    
    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
        toast({
            position: 'top',
            title: 'Logout success!',
            description: "See you again!",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    return (
        <div className="d-flex justify-content-between fixed-top px-5 py-4 ">
            <div className="d-flex align-items-center gap-3">
                <ProfileIcon/>
                <div className=" flex-column">
                    <h4 className=" fw-bold shadow14">Username: {profile.firstName}</h4>
                    <h4 className=" fw-bold shadow14">MMR: {profile.mmr}</h4>
                </div>
            </div>
            <div className="flex-column">
            <h5 className="fw-bold"> <i className="bi bi-circle-fill text-success"></i> Total Online: 100 <i className="bi bi-person-fill fs-3"></i></h5>
            <button onClick={play}>
            <h5 onClick={handleLogout} className="cursor-pointer fw-bold"> <i className="bi bi-box-arrow-right"></i> Logout </h5>
            </button>
            </div>
        </div>
    )
}

export default Navbar