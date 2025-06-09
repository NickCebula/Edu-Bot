// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

// 1. Grab the container once:
const container = document.getElementById("root");

// 2. Call createRoot exactly one time:
const root = ReactDOM.createRoot(container);

// 3. Use root.render(...) from now on:
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
