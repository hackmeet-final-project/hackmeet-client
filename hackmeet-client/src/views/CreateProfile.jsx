const CreateProfile = () => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <div className="card rounded-5 border-2 border-secondary shadow-button w-25">
                <div className="card-body">
                    <h2 className="mb-3 text-center fw-bold " >Create Profile</h2>
                    <form action="">
                        <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">First name</label> <br />
                            <input type="text" name="" placeholder="Input your first name" className="form-control" required autoFocus />
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Last name</label> <br />
                            <input type="text" name="" placeholder="Input your last name" className="form-control" autoFocus />
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Hacktiv8 ID</label> <br />
                            <input type="text" name="" placeholder="Input your hacktiv8 id" className="form-control" autoFocus />
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Role</label> <br />
                            <select class="form-select" aria-label="Default select example">
                                <option selected hidden>Choose your roles</option>
                                <option value="Student">Student</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                        </div> <br />
                        <button className="btn w-100 rounded-pill mb-3 text-white fw-bold shadow-secondary" style={{ backgroundColor: " #E86E7F" }} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile