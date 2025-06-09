// frontend/src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { authFetch } from "../utils/authFetch";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  // Utility to refresh token
  async function refreshToken() {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return null;
    const res = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      return data.access;
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await authFetch("/api/profile/");
      if (res.ok) {
        const data = await res.json();
        setFullName(data.full_name);
        setUsername(data.user || data.full_name || "");
      } else {
        setFullName("");
        setUsername("");
      }
    };
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ username, fullName }}>
      {children}
    </AuthContext.Provider>
  );
}
