

const Logout = () => {
    const handleLogout = () => {
        localStorage.clear()
    }
    return (
        <button className="btn btn-secondary position-absolute" onClick={handleLogout}>Logout</button>
    )
}

export default Logout