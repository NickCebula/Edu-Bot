import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(r => r.json())
      .then(data => {
        setStatus(data.success ? "success" : "error");
      });
  }

  return (
    <div className="centered-page">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email"
          required value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Send Reset Link</button>
      </form>
      {status === "error" && <p className="error">Email not found.</p>}
      {status === "success" && <p className="success">Reset link sent!</p>}
      <p>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
