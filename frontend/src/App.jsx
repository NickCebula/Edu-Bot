import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Subjects from "./pages/Subjects";
import Math from "./pages/Math";
import Evaluations from "./pages/Evaluations";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/subjects"        element={<Subjects />} />
        <Route path="/math"            element={<Math />} />
        <Route path="/evaluations"     element={<Evaluations />} />
        <Route path="*"                 element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
