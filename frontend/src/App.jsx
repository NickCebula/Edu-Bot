import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Subjects from "./pages/Subjects";
import Math from "./pages/Math";
import Profile from "./pages/Profile";
import Evaluations from "./pages/Evaluations";
import Reading from "./pages/Reading";
import Spelling from "./pages/Spelling";
import StudentInfo from "./pages/StudentInfo";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/student-info"    element={<StudentInfo />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/subjects"        element={<Subjects />} />
        <Route path="/math"            element={<Math />} />
        <Route path="/info"            element={<Dashboard />} />
        <Route path="/settings"        element={<StudentInfo />} />
        <Route path="/logout"          element={<Logout />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/evaluations"     element={<Evaluations />} />
        <Route path="/reading"         element={<Reading />} />
        <Route path="/spelling"        element={<Spelling />} />
        <Route path="*"                element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
