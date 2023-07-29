import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const baseUrl = "http://localhost:3000"

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(baseUrl + "/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            if (res.ok) {
                const data = await res.json()
                localStorage.access_token = data.access_token
                console.log(data.access_token)
                Swal.fire(
                    'Success login!',
                    "Succes!",
                    'success'
                )
                navigate("/create-profile")
            } else {
                const error = await res.json()
                Swal.fire(
                    'Ups!',
                    error.message,
                    'error'
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
                    <div className="card rounded-5 border-2 border-secondary shadow-main w-25">
                        <div className="card-body">
                            <h2 className="mb-3 text-center fw-bold " >Login</h2>
                            <form action="" onSubmit={handleSubmit}>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="" className="fw-bold">Email</label> <br />
                                    <input type="text" name="" placeholder="Input your email" className="form-control" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div> <br />
                                <div className="form-group">
                                    <label htmlFor="" className="fw-bold">Password</label> <br />
                                    <input type="password" name="" placeholder="Input your password" className="form-control" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div> <br />
                                <button className="btn w-100 rounded-pill mb-3 text-white fw-bold shadow-secondary" style={{ backgroundColor: "#E86E7F"}} type="submit">Sign In</button>
                            </form>
                        </div>
                    </div>
        </div>
    )
}

export default Login