import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../config/axios";
import { useToast } from "@chakra-ui/react"
import useSound from 'use-sound';
import openSound from "../audio/openSound.mp3"

const Login = () => {
    const toast = useToast()
    const [play] = useSound(openSound);
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await Axios.post("/users/login", {
                email,
                password,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            localStorage.access_token = data.access_token
            toast({
                position: 'top',
                title: 'Login success!',
                description: "Welcome!",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            const res = await Axios.get("/profiles", {
                headers: {
                    access_token: localStorage.access_token,
                },
            })
            if (!res.data) {
                navigate("/create-profile")
            } else {
                navigate("/lobby")
            }
        } catch (error) {
            console.log(error)
            toast({
                position: 'top',
                title: 'Ups!',
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center flex-column" style={{ height: "100vh" }}>
            <div className="card rounded-5 border-2 border-secondary shadow-main w-25">
                <div className="card-body">
                    <h2 className="mb-2 text-center fw-bold " >Login</h2>
                    <form action="" className="px-3" onSubmit={handleSubmit}>
                        <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Email</label> <br />
                            <input type="text" name="" placeholder="Input your email" className="form-control" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} tabIndex="1"/>
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Password</label> <br />
                            <input type="password" name="" placeholder="Input your password" className="form-control" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div> <br />
                        <button className="btn w-100 rounded-pill mb-3 text-white fw-bold shadow-secondary button-hover" style={{ backgroundColor: "var(--fourth-color)" }} type="submit" onClick={play}>Sign In</button>
                        <p className="text-center">Dont have an account? <Link className="text-primary" to="/register" > <u>Register</u></Link>  </p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login