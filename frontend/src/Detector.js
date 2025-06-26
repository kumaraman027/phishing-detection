import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

const API = process.env.REACT_APP_API_URL || "https://phishing-detection-bxef.onrender.com";

function Detector() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trustScore, setTrustScore] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const isValidURL = (input) => {
    try {
      const urlObj = new URL(input.includes("://") ? input : `http://${input}`);
      return urlObj.hostname.includes(".");
    } catch {
      return false;
    }
  };

  const handleCheck = async () => {
    if (!isValidURL(url)) {
      alert("Please enter a valid and complete URL like https://example.com");
      return;
    }

    setLoading(true);
    setResult("");
    setDetails(null);
    setTrustScore(null);

    try {
     const response = await axios.post("https://phishing-detection-bxef.onrender.com/predict", { url });

      const data = response.data;

      setResult(data.result);
      setTrustScore(data.trustScore || 75);

      const historyItem = {
        url,
        result: data.result,
        time: new Date().toLocaleString(),
      };
      const existingHistory = JSON.parse(localStorage.getItem("scanHistory")) || [];
      localStorage.setItem("scanHistory", JSON.stringify([historyItem, ...existingHistory]));

      if (data.result === "Legitimate") {
        setDetails({
          ip: data.ip,
          country: data.country,
          region: data.region,
          city: data.city,
          isp: data.isp,
          org: data.org,
          safeBrowsing: data.safeBrowsing,
        });
        setShowInfo(true);
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      setResult("Error checking URL");
    }

    setLoading(false);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className="center-wrapper">
      <div className="container">
        <Link to="/" className="home-link">← Go back to Home</Link>
        <h1 className="title">Phishing URL Detector</h1>

        <input
          className="url-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
        />
        <button className="check-button" onClick={handleCheck} disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </button>

        {loading && <div className="loader"></div>}

        {!loading && result && (
          <p className={`result ${result === "Legitimate" ? "safe" : "phish"}`}>
            Result: {result}
          </p>
        )}

        {trustScore !== null && (
          <div className="trust-bar-container">
            <p className="trust-label">Trust Score: {trustScore}/100</p>
            <div className="trust-bar-bg">
              <div
                className="trust-bar-fill"
                style={{
                  width: `${trustScore}%`,
                  backgroundColor:
                    trustScore >= 80 ? "#10b981" : trustScore >= 50 ? "#f59e0b" : "#ef4444",
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="tips-toggle-container">
          <button className="tips-toggle-btn" onClick={() => setShowTips(!showTips)}>
            {showTips ? "Hide" : "Learn More"}
          </button>

          {showTips && (
            <div className="tips-section">
              <h3>Security Tips</h3>
              <ul>
                <li>Always double-check the URL before clicking.</li>
                <li>Look for HTTPS and the padlock icon.</li>
                <li>Don’t share personal info on suspicious forms.</li>
                <li>Enable 2FA on all accounts when possible.</li>
                <li>Use trusted antivirus and anti-phishing tools.</li>
              </ul>
            </div>
          )}
        </div>

        {showInfo && details && (
          <div className="info-modal">
            <div className="info-modal-content">
              <button className="close-btn" onClick={handleCloseInfo}>X</button>
              <h3>🌐 Website Info</h3>
              <p><strong>Safe Browsing Status:</strong> {details.safeBrowsing}</p>
              <p><strong>IP:</strong> {details.ip}</p>
              <p><strong>Country:</strong> {details.country}</p>
              <p><strong>Region:</strong> {details.region}</p>
              <p><strong>City:</strong> {details.city}</p>
              <p><strong>ISP:</strong> {details.isp}</p>
              <p><strong>Organization:</strong> {details.org}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detector;
