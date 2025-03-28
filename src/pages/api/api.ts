import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  if (token) {
    config.headers["api-key"] = token;
  }
  return config;
});

export default api;
