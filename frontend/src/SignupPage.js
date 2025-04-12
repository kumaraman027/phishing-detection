import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !username || !email || !password || !confirm) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const user = { name, username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="center-wrapper">
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <input className="url-input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="url-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="url-input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="url-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="url-input" placeholder="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button className="check-button" onClick={handleSignup}>Sign Up</button>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">Login</Link>
          </p>
          <p>
            <Link to="/" className="link-2">Go back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
