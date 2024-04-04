import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    axios.defaults.withCredentials =true
      const response = await axios.post('http://localhost:4000/api/login', {
        Email,
        Password
      });
      
      const { token } = response.data;
      const {userName} = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName",userName)
      navigate('/welcome')
      
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <h1 className="login-heading">LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password">
            <input
              type={show ? "text" : "password"}
              placeholder="Create Password"
              required
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <button className="login-btn" type="submit">
            LOGIN
          </button>
          <h4>
            Forgot Password {" "}
            <Link to={"/forgotPassword"} className="link">
              Click here
            </Link>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
