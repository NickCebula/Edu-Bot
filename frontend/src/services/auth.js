import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// call this on startup if you already have a token
export function setAuthHeader(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// perform login, returns `{ access, refresh }`
export async function login(username, password) {
  const { data } = await api.post("/token/", { username, password });
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  setAuthHeader(data.access);
  return data;
}

export function bootstrapAuth() {
  const access = localStorage.getItem("access");
  if (access) {
    setAuthHeader(access);
  }
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token available");
  
  const { data } = await api.post("/token/refresh/", { refresh });
  localStorage.setItem("access", data.access);
  setAuthHeader(data.access);
  return data.access;
}

export async function logout() {
  try {
    const refresh = localStorage.getItem("refresh");
    if(refresh) await api.post(/logout/, { refresh });
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthHeader(null);
    delete api.defaults.headers.common["Authorization"];
    localStorage.setItem('logout', Date.now());
  }
}

export default api;


