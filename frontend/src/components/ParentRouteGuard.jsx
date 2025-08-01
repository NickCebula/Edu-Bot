import { Navigate } from "react-router-dom";
import { useParent } from "../contexts/ParentContext";

export default function ParentRouteGuard({ children }) {
  const { parentMode } = useParent();
  return parentMode ? children : <Navigate to="/parentview/enter-pin" replace />;
}
