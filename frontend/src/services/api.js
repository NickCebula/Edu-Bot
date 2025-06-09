import axios from "axios";

export const api = axios.create({
  baseURL: "/api",        // Vite will proxy this to Django:8000/api
  timeout: 5000,
});

export async function fetchGeneratedQuestion(subject, level) {
  const response = await fetch('/api/generate-reading/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ subject, level })
  });

  const data = await response.json();
  return data.question;
}
