import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "", email: "", password: "", confirm_password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
     if (form.password !== form.confirm_password) {
      setMessage("Passwords do not match");
      return;
    }
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
    };
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async r => {
        let data;
        try {
          data = await r.json();
        } catch {
          setMessage("Server error: invalid response.");
          return;
        }
        if (data.success) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          setMessage("Registered! Let's learn more about you...");
          setTimeout(() => navigate("/student-info"), 1000);
        } else setMessage(data.message);
      });
  }
  
  return (
    <div className="centered-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {message && <p className={message.includes("error") ? "error" : "success"}>{message}</p>}
        <input name="username" placeholder="Username" required onChange={handleChange}/>
        <input name="email" placeholder="Email" type="email" required onChange={handleChange}/>
        <input name="password" placeholder="Password" type="password" required onChange={handleChange}/>
        <input name="confirm_password" placeholder="Confirm Password" type="password" required onChange={handleChange}/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
