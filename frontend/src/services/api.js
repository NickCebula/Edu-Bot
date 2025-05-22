import axios from "axios";

export const api = axios.create({
  baseURL: "/api",        // Vite will proxy this to Django:8000/api
  timeout: 5000,
});
