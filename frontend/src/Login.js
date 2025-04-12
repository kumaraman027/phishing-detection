import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter your credentials.");
      return;
    }
  
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify({
        name: storedUser.name,
        username: storedUser.username
      }));
      navigate("/");
    }
    else {
      alert("Invalid credentials");
    }
  };
  

  return (
    <div className="center-wrapper">
      <div className="container">
        <h1 className="title">Login</h1>
        <input className="url-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="url-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="check-button" onClick={handleLogin}>Login</button>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="link">Sign Up</Link>
          </p>
          <p>
            <Link to="/" className="link-2">Go back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
