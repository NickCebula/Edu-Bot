import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authFetch } from "../utils/authFetch";


export function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await authFetch("/api/profile/");
      if (res.ok) {
        const data = await res.json();
        setFullName(data.full_name);
        setUsername(data.user || data.full_name || "");
      } else {
        console.error("Failed to fetch profile:", res.statusText);
        setUsername("Guest");
        setFullName("Guest User");
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