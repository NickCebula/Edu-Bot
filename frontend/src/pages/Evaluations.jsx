import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { authFetch } from "../utils/authFetch";
import "../assets/Subjects.css";

// Example navigation links
const navLinks = [
  { to: "/subjects", label: "SUBJECTS" },
  { to: "/evaluations", label: "EVALUATIONS" },
  { to: "/profile", label: "PROFILE" },
];

const token = localStorage.getItem("token");

async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  const res = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) throw new Error("Refresh failed");
  const data = await res.json();
  localStorage.setItem("token", data.access);
  return data.access;
}

export default function Evaluations() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await authFetch("/api/evaluation/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLogs([
          ...logs,
          `${new Date().toLocaleString()}: ${data.evaluation || "Generated evaluation successfully."}`
        ]);
      } else {
        setLogs([
          ...logs,
          `${new Date().toLocaleString()}: Failed to generate evaluation.`
        ]);
      }
    } catch (error) {
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