import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const ScanHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("scanHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return alert("No items selected.");
    if (!window.confirm("Delete selected scan history items?")) return;

    const newHistory = history.filter((_, index) => !selectedItems.includes(index));
    setHistory(newHistory);
    localStorage.setItem("scanHistory", JSON.stringify(newHistory));
    setSelectedItems([]);
  };

  const handleDeleteAll = () => {
    if (!window.confirm("Are you sure you want to delete all scan history?")) return;
    setHistory([]);
    localStorage.removeItem("scanHistory");
    setSelectedItems([]);
  };

  return (
    <div className="center-wrapper">
      <div className="container">
        <h1 className="title">Scan History</h1>
        <button className="check-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        {history.length === 0 ? (
          <p>No scan history found.</p>
        ) : (
          <>
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={index} className="history-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="history-checkbox"
                  />
                  <div className="history-details">
                    <p><strong>URL:</strong> {item.url}</p>
                    <p><strong>Result:</strong> {item.result}</p>
                    <p><strong>Time:</strong> {item.time}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="history-buttons">
  <button className="history-btn" onClick={handleDeleteSelected}>
    Delete Selected
  </button>
  <button className="history-btn delete-all" onClick={handleDeleteAll}>
    Delete All
  </button>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
