// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Edu-Bot!</h1>
      <p>Select a subject to begin:</p>
      <div className="flex space-x-2">
        <Link to="/math" className="btn btn-primary">Math</Link>
        <Link to="/reading" className="btn btn-secondary">Reading</Link>
        <Link to="/spelling" className="btn btn-accent">Spelling</Link>
      </div>
    </div>
  );
}
