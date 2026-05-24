import { useState } from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post("/users/register", {
                name,
                email,
                password,
            });

            toast.success(data.message);

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;