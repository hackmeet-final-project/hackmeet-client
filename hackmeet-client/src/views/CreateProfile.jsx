import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../config/axios";
import { useToast } from "@chakra-ui/react"


const CreateProfile = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [lastName, setlastName] = useState("")
    const [firstName, setfirstName] = useState("")
    const [hacktivId, setHacktivId] = useState("")
    const [role, setRole] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post("/profiles", { firstName, lastName, hacktivId, role },
                {
                    headers: {
                        "Content-Type": "application/json",
                        access_token: localStorage.access_token
                    },
                }
            )
            toast({
                position: 'top',
                title: 'Complete profile success!',
                description: `Lets get started it, ${firstName}!`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            navigate("/lobby")

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
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="card rounded-5 border-2 border-secondary shadow-main w-25">
                <div className="card-body">
                    <h2 className="mb-3 text-center fw-bold " >Create Profile</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">First name</label> <br />
                            <input type="text" name="" placeholder="Input your first name" className="form-control" required autoFocus value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Last name</label> <br />
                            <input type="text" name="" placeholder="Input your last name" className="form-control" autoFocus value={lastName} onChange={(e) => setlastName(e.target.value)} />
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Hacktiv8 ID</label> <br />
                            <input type="text" name="" placeholder="Input your hacktiv8 id" className="form-control" autoFocus value={hacktivId} onChange={(e) => setHacktivId(e.target.value)} />
                        </div> <br />
                        <div className="form-group">
                            <label htmlFor="" className="fw-bold">Role</label> <br />
                            <select className="form-select" aria-label="Default select example" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option hidden>Choose your roles</option>
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