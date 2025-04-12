import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landingpage";
import Detector from "./Detector";
import LoginPage from "./Login";
import SignupPage from "./SignupPage";
import ScanHistory from "./ScanHistory";




function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Detector />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/history" element={<ScanHistory />} />
         

        </Routes>
      
    </Router>
  );
}

export default App;
