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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/subjects"        element={<Subjects />} />
        <Route path="/math"            element={<Math />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/evaluations"     element={<Evaluations />} />
        <Route path="/reading"         element={<Reading />} />
        <Route path="/spelling"        element={<Spelling />} />
        <Route path="*"                element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
