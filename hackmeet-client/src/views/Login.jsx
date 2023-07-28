const Login = () => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
                    <div className="card rounded-5 border-2 border-secondary shadow-button w-25">
                        <div className="card-body">
                            <h2 className="mb-3 text-center fw-bold " >Login</h2>
                            <form action="">
                                <br />
                                <div className="form-group">
                                    <label htmlFor="" className="fw-bold">Email</label> <br />
                                    <input type="text" name="" placeholder="Input your email" className="form-control" required autoFocus />
                                </div> <br />
                                <div className="form-group">
                                    <label htmlFor="" className="fw-bold">Password</label> <br />
                                    <input type="password" name="" placeholder="Input your password" className="form-control" required autoFocus />
                                </div> <br />
                                <button className="btn w-100 rounded-pill mb-3 text-white fw-bold shadow-secondary" style={{ backgroundColor: " #E86E7F"}} type="submit">Sign In</button>
                            </form>
                        </div>
                    </div>
        </div>
    )
}

export default Login