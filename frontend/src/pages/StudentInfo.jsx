import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentInfo() {
  const [form, setForm] = useState({ grade: "", favorite_subject: "", notes: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    fetch("/api/student-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          navigate("/subjects");
        } else {
          setMessage("Error saving info");
        }
      });
  };

  return (
    <div className="centered-page">
      <h2>Tell us about yourself</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="grade" placeholder="Grade" value={form.grade} onChange={handleChange} required />
        <input name="favorite_subject" placeholder="Favourite Subject" value={form.favorite_subject} onChange={handleChange} />
        <textarea name="notes" placeholder="Anything else" value={form.notes} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}