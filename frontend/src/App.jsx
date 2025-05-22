import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";   // no “.jsx” needed
import Math from "./pages/Math";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/math" element={<Math />} />
          {/* add other routes here */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
