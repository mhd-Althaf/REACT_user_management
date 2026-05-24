import { useState } from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

import { setCredentials } from "../redux/slices/authSlice";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      dispatch(
        setCredentials({
          ...data.user,
          token: data.token,
        })
      );

      toast.success(data.message);

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;