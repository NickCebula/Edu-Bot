import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../assets/Subjects.css";

// Example navigation links
const navLinks = [
  { to: "/subjects", label: "SUBJECTS" },
  { to: "/evaluations", label: "EVALUATIONS" },
  { to: "/profile", label: "PROFILE" },
];

export default function Evaluations() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/evaluation/generate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Guest", grade: "2nd" }),
      });
      const data = await res.json();
      setLogs([
        ...logs,
        `${new Date().toLocaleString()}: ${data.evaluation || "Failed to generate evaluation."}`
      ]);
    } catch (err) {
      setLogs([
        ...logs,
        `${new Date().toLocaleString()}: Error generating evaluation.`
      ]);
    }
    setLoading(false);
  };

  return (
    <div>
      <NavBar title="Edu-Bot" links={navLinks} username="Guest" />
      <div className="container">
        <h2>EVALUATIONS</h2>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "GENERATING..." : "GENERATE NEW EVALUATION"}
        </button>
        <div className="evaluations">
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}