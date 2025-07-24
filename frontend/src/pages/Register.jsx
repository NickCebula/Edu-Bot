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
        <select name="age" required onChange={handleChange} value={form.age}>
          <option value="">Select Age</option>
          {[...Array(15)].map((_, i) => (
            <option key={i+4} value={i+4}>{i+4}</option>
          ))}
        </select>
        <select name="state" required onChange={handleChange} value={form.state}>
          <option value="">Select State</option>
          {[
            "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
            "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
            "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
            "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
            "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
          ].map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
        <select name="favorite_subject" required onChange={handleChange} value={form.favorite_subject}>
          <option value="">Select Favorite Subject</option>
          <option value="Math">Math</option>
          <option value="Reading">Reading</option>
          <option value="Spelling">Spelling</option>
        </select>
        <input name="favorite_hobby" placeholder="Favorite Hobby" required onChange={handleChange}/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}