import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../assets/NavBar.css"; // Optional: you can keep or remove this if you rely solely on inline styles

export default function NavBar({ title = "Edu-Bot", links = [] }) {
  const { username, fullName } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen((open) => !open);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 2rem",
        background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
        color: "#fff",
        fontFamily: "sans-serif",
        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.1)",
      }}
    >
      {/* Logo / Title */}
      <div
        className="logo"
        style={{ fontWeight: 700, fontSize: "1.3rem", cursor: "pointer" }}
        onClick={() => (window.location.href = "/")}
      >
        {title}
      </div>

      {/* Navigation Links */}
      <div className="nav-links" style={{ display: "flex", gap: "1.5rem" }}>
        {links.map(({ to, label }, i) => (
          <Link
            key={i}
            to={to}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* User Dropdown */}
      <div className="dropdown-container" style={{ position: "relative" }}>
        <button
          onClick={handleDropdownToggle}
          style={{
            background: "#1565c0",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "0.5rem 1.2rem",
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 1px 4px rgba(21, 101, 192, 0.15)",
          }}
          type="button"
        >
          <span role="img" aria-label="user" style={{ marginRight: 8 }}>
            👤
          </span>
          {fullName || username || "Menu"}
          <svg
            style={{ marginLeft: 8 }}
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "#fff",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
              minWidth: "160px",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            <ul style={{ margin: 0, padding: "0.5rem 0", listStyle: "none" }}>
              <li>
                <Link
                  to="/settings"
                  style={{
                    display: "block",
                    padding: "0.75rem 1.25rem",
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  className="dropdown-link"
                  onMouseOver={(e) =>
                    (e.target.style.background = "#e3f2fd")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/info"
                  style={{
                    display: "block",
                    padding: "0.75rem 1.25rem",
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  className="dropdown-link"
                  onMouseOver={(e) =>
                    (e.target.style.background = "#e3f2fd")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  Info
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  style={{
                    display: "block",
                    padding: "0.75rem 1.25rem",
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  className="dropdown-link"
                  onMouseOver={(e) =>
                    (e.target.style.background = "#e3f2fd")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
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
