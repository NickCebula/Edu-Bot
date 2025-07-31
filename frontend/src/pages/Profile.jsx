import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { authFetch } from "../utils/authFetch";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authFetch("/api/profile/");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      }
    };

    fetchProfile();
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