import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
                name, email, gender
            });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserById();
    }, []);
    
    const getUserById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            console.log(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setGender(response.data.gender);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
