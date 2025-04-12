import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Header */}
      <header className="header-bar">
        <h1 className="logo-text">PhishGuard</h1>
        <div className="auth-buttons flex items-center gap-3">
          {user ? (
            <>
              <span className="text-white font-medium">Welcome, {user.name}</span>

              <Link to="/history">
                <button className="auth-btn bg-white text-indigo-600 hover:bg-gray-100 transition-all">
                  View History
                </button>
              </Link>

              <button onClick={handleLogout} className="auth-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="auth-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="auth-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <p className="text-xl md:text-2xl font-light mb-8 max-w-xl leading-relaxed">
          “Empower your web safety with cutting-edge AI — detect phishing threats before they strike.”
        </p>
        <Link to="/app">
          <button className="center-button">Get Started</button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-white opacity-80">
        © 2025 PhishGuard. All rights reserved.
      </footer>
  

    </div>
  );
};

export default LandingPage;
