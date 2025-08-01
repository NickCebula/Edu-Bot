import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "../assets/NavBar.css";
import { logout } from "@/services/auth";
import { useParent } from "../contexts/ParentContext";


export default function NavBar({ title, username, links = [], color }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDropdownToggle = () => setDropdownOpen((open) => !open);
  const { parentMode } = useParent();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".dropdown-container")) setDropdownOpen(false);
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Determine color class for navbar and dropdown button
  let colorClass = "";
  if (color === "red") colorClass = "red";
  else if (color === "lightgreen") colorClass = "lightgreen";
  else if (color === "blue") colorClass = "blue";

  return (
    <nav className={`navbar${colorClass ? " " + colorClass : ""}`}>
      <div
        className="logo"
        onClick={() => window.location.href = "/"}
      >
        {title}
      </div>
      <div className="nav-links">
        {links.map(({ to, label }, i) => (
          <Link key={i} to={to}>
            {label}
          </Link>
        ))}
      </div>
      <div className="dropdown-container">
        <button
          onClick={handleDropdownToggle}
          className="dropdown-btn"
          type="button"
        >
          <span role="img" aria-label="user" style={{ marginRight: 8 }}>👤</span>
          {username}
          <svg style={{ marginLeft: 8 }} width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path d="M4 6l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul className="dropdown-list">
                <li>
                <Link to="/ParentView" className="dropdown-link">
                  {parentMode ? "Parent Dashboard" : "Parent Mode"}
                </Link>
              </li>
              <li>
                <Link to="/settings" className="dropdown-link">Settings</Link>
              </li>
              <li>
                <Link to="/info" className="dropdown-link">Info</Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="dropdown-link" type="button">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}