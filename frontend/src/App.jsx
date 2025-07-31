import React from "react";
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Subjects from "./pages/Subjects";
import Math from "./pages/Math";
import Profile from "./pages/Profile";
import Evaluations from "./pages/Evaluations";
import Reading from "./pages/Reading";
import Spelling from "./pages/Spelling";
import ParentView from "./pages/ParentView";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import { logout } from "./services/auth";

function StorageListener() {
  const nagigate = useNavigate();
  React.useEffect(() => {
    function handleStorage(e) {
      if (e.key === 'logout') {
        logout();
        nagigate('/login', { replace: true });
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [nagigate]);
  return null;
}

export default function App() {

  return (
    <BrowserRouter>
      <StorageListener />
      <Routes>
        <Route path="/"                element={<LandingPage />} />
        <Route path="/login"           element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/subjects"        element={<Subjects />} />
          <Route path="/math"            element={<Math />} />
          <Route path="/profile"         element={<Profile />} />
          <Route path="/evaluations"     element={<Evaluations />} />
          <Route path="/reading"         element={<Reading />} />
          <Route path="/spelling"        element={<Spelling />} />
          <Route path="/ParentView"      element={<ParentView />} />
        </Route>
        <Route path="/logout"          element={<Logout />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*"                element={<LandingPage />} />
      </Routes>      
    </BrowserRouter>
  );
}
