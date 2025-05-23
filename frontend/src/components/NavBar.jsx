import React from "react";
import { Link } from "react-router-dom";
import "../assets/NavBar.css";

export default function NavBar({ title, username, links = [] }) {
  return (
    <div className="top-bar">
      <div className="logo" onClick={() => window.location.href = "/"}>
        {title}
      </div>
      <div className="nav-links">
        {links.map(({ to, label }, i) => (
          <Link key={i} to={to}>{label}</Link>
        ))}
      </div>
      {username && <div className="user-dropdown">👤 {username}</div>}
    </div>
  );
}
