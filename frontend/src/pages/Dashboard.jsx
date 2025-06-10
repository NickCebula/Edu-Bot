import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { authFetch } from "../utils/authFetch";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    authFetch("/api/profile/").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    });
  }, []);

  if (!profile) return (
    <>
      <NavBar title="Edu-Bot" links={[]} />
      <div className="centered-page">Loading...</div>
    </>
  );

  return (
    <>
      <NavBar title="Edu-Bot" links={[{ to: "/subjects", label: "BACK" }]} />
      <div className="centered-page">
        <h2>Dashboard</h2>
        <p><strong>Grade:</strong> {profile.grade}</p>
        <p><strong>Favorite Subject:</strong> {profile.favorite_subject}</p>
        <p><strong>Notes:</strong> {profile.notes}</p>
      </div>
    </>
  );
}