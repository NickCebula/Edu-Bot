export async function authFetch(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");
  let refreshToken = localStorage.getItem("refresh_token");

  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${accessToken}`;

  let response = await fetch(url, options);

  // If token is expired, try to refresh
  if (response.status === 401) {
    const refreshResponse = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      localStorage.setItem("access_token", refreshData.access);

      // Retry the original request with new access token
      options.headers["Authorization"] = `Bearer ${refreshData.access}`;
      return fetch(url, options);
    } else {
      console.error("Refresh token expired or invalid. Logging out.");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // Redirect to login page if needed
    }
  }

  return response;
}
