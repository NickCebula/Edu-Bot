import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/auth";

export default function Logout() {
  const navigate = useNavigate();
  useEffect (() => {
    (async () => {
      await logout();
      navigate("/login", { replace: true });
    })();
  }, [navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h1 className="text-2xl font-bold text-gray-900">Logging out...</h1>
    </div>
  );
}