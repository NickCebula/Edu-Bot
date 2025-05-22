import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Math from "./pages/Math"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/math" element={<Math />} />
          {/* …other pages */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
