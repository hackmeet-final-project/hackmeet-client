import { Link } from "react-router-dom"


const Logout = () => {
    const handleLogout = () => {
        localStorage.clear()
    }
    return (
        <Link to="/login" className="btn btn-secondary position-absolute" onClick={handleLogout}>Logout</Link>
    )
}

export default Logout