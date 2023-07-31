import { Link } from "react-router-dom"


const Lobby = () => {
    return (
        <div className="container-fluid d-flex justify-content-center">
            <Link to={"/battle"}>Battle</Link>
        </div>
    )
}

export default Lobby