import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
// Try to refresh token if expired
const token = localStorage.getItem("access_token");
fetch("http://localhost:8000/api/profile/", {
  credentials: "include",
  headers: { "Authorization": `Bearer ${token}` }
})
  .then(res => {
    if (res.status === 401) {
      // Token expired, try to refresh
      const refresh = localStorage.getItem("refresh_token");
      return fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh })
      })
        .then(r => r.json())
        .then(data => {
          if (data.access) {
            localStorage.setItem("access_token", data.access);
            // Retry profile fetch with new token
            return fetch("http://localhost:8000/api/profile/", {
              credentials: "include",
              headers: { "Authorization": `Bearer ${data.access}` }
            }).then(r => r.json());
          } else {
            // Refresh failed, redirect to login
            window.location.href = "/login";
          }
        });
    }
    return res.json();
  })
  .then(data => setProfile(data))
  .catch(() => setProfile(null));
  }, []);

  if (!profile) {
    return (
      <>
        <NavBar
          title="Edu-Bot"
          username="Guest"
          links={[
            { to: "/subjects", label: "SUBJECTS" },
            { to: "/evaluations", label: "EVALUATIONS" },
            { to: "/profile", label: "PROFILE" },
          ]}
        />
        <div className="profile-container">
          <h2>PROFILE</h2>
          <div className="icon">👤</div>
          <p>Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar
        title="Edu-Bot"
        username={profile.username}
        links={[
          { to: "/subjects", label: "SUBJECTS" },
          { to: "/evaluations", label: "EVALUATIONS" },
          { to: "/profile", label: "PROFILE" },
        ]}
      />

      <div className="profile-container">
        <h2>PROFILE</h2>
        <div className="icon">👤</div>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>State:</strong> {profile.state}</p>
        <p><strong>Favorite Subject:</strong> {profile.favorite_subject}</p>
        <p><strong>Favorite Hobby:</strong> {profile.favorite_hobby}</p>

        <div className="subject-times">
          <div className="subject-time math">MATH<br />Total time:</div>
          <div className="subject-time reading">READING<br />Total time:</div>
          <div className="subject-time spelling">SPELLING<br />Total time:</div>
        </div>
      </div>
    </>
  );
}