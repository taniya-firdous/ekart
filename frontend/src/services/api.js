const BASE_URL = "http://localhost:8081/api";
export const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:8081/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const text = await response.text(); // safer than json
    throw new Error(text || "Login failed");
  }

  return await response.text(); // since backend returns String (JWT)
};
export const registerUser = async (userData) => {
  const response = await fetch("http://localhost:8081/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.text();
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });
};