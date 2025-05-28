import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Profile.css"; // Import styles

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [name, setName] = useState("---");
  const [dob, setDob] = useState("---");
  const [favorite, setFavorite] = useState("---");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
    setName(storedUsername); // Placeholder
    setDob("01/01/2010");
    setFavorite("Reading");
  }, []);

  return (
    <div className="profile-root">
      <div className="top-bar">
        <div onClick={() => navigate("/subjects")} className="top-bar-title">Edu-Bot</div>
        <div className="nav-links">
          <a href="/subjects">SUBJECTS</a>
          <a href="/evaluations">EVALUATIONS</a>
          <a href="/profile">PROFILE</a>
        </div>
        <div>👤 {username}</div>
      </div>

      <div className="profile-container">
        <h2>PROFILE</h2>
        <div className="icon">👤</div>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>DOB:</strong> {dob}</p>
        <p><strong>Favorite Subject:</strong> {favorite}</p>

        <div className="subject-times">
          <div className="subject-time math">MATH<br />Total time:</div>
          <div className="subject-time reading">READING<br />Total time:</div>
          <div className="subject-time spelling">SPELLING<br />Total time:</div>
        </div>
      </div>
    </div>
  );
}
