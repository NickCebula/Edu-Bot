import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = localStorage.getItem('access_token'); // or 'token' if that's the one you keep
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
