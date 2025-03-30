import axios from "axios";

const PORT: number = 8080;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
