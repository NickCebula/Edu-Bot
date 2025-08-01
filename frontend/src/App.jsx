import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login          from "./pages/Login";
import Register       from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Subjects       from "./pages/Subjects";
import Math           from "./pages/Math";
import Profile        from "./pages/Profile";
import Evaluations    from "./pages/Evaluations";
import Reading        from "./pages/Reading";
import Spelling       from "./pages/Spelling";
import ParentView     from "./pages/ParentView";
import LandingPage    from "./pages/LandingPage";
import PrivateRoute   from "./components/PrivateRoute";
import Logout         from "./pages/Logout";
import ParentPin      from "./components/PinPad";

import { logout }          from "./services/auth";
import { ParentProvider }  from "./contexts/ParentContext";

// —————————————————————————
// helpers
function StorageListener() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "logout") {
        logout();
        navigate("/login", { replace: true });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate]);

  return null;
}

// react-query client
const queryClient = new QueryClient();

// —————————————————————————
export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ParentProvider>
          <StorageListener />

          <Routes>
            {/* public routes */}
            <Route path="/"                element={<LandingPage />} />
            <Route path="/login"           element={<Login />} />
            <Route path="/register"        element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/logout"          element={<Logout />} />

            {/* protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/subjects"           element={<Subjects />} />
              <Route path="/math"               element={<Math />} />
              <Route path="/profile"            element={<Profile />} />
              <Route path="/evaluations"        element={<Evaluations />} />
              <Route path="/reading"            element={<Reading />} />
              <Route path="/spelling"           element={<Spelling />} />

              {/* parent mode */}
              <Route path="/parentview"                 element={<ParentView />} />
              <Route path="/parentview/enter-pin"       element={<ParentPin />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </ParentProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
