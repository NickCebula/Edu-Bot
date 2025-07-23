import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "", email: "", password: "", confirm_password: "",
    name: "", age: "", state: "", favorite_subject: "", favorite_hobby: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      username: form.username,
      email: form.email,
      password1: form.password,
      password2: form.confirm_password,
      name: form.name,
      age: form.age,
      state: form.state,
      favorite_subject: form.favorite_subject,
      favorite_hobby: form.favorite_hobby
    };

    fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include" // for cookies, CSRF if needed
    })
      .then(r => r.json())
      .then(data => {
        if (data.detail || data.error) {
          setMessage(data.detail || data.error);
        } else if (data.username || data.password1) {
          // field errors
          const errors = [];
          for (let field in data) {
            errors.push(`${field}: ${data[field].join(", ")}`);
          }
          setMessage(errors.join(" | "));
        } else {
          setMessage("Registered! Redirecting…");
          setTimeout(() => navigate("/login"), 1000);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Registration failed. Please try again.");
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
        <input name="name" placeholder="Full Name" required onChange={handleChange}/>
        <input name="age" placeholder="Age" type="number" required onChange={handleChange}/>
        <input name="state" placeholder="State" required onChange={handleChange}/>
        <input name="favorite_subject" placeholder="Favorite Subject" required onChange={handleChange}/>
        <input name="favorite_hobby" placeholder="Favorite Hobby" required onChange={handleChange}/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}