import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// call this on startup if you already have a token
export function setAuthHeader(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// perform login, returns `{ access, refresh }`
export function login(username, password) {
  return api.post("/token/", { username, password })
    .then(res => {
      const { access, refresh } = res.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setAuthHeader(access);
      return res.data;
    });
}

// optionally add a refresh() function:
export function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");
  return api.post("/token/refresh/", { refresh })
    .then(res => {
      const { access } = res.data;
      localStorage.setItem("access_token", access);
      setAuthHeader(access);
      return access;
    });
}
