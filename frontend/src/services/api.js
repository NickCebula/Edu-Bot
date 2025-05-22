import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 5000,
});

export function fetchNextQuestion(subject) {
  return api.get(`/questions/next/?subject=${subject}`);
}
