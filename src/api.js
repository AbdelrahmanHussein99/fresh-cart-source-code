import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default API;

API.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem("userToken");
    if (token) config.headers.token = token;
    return config;
  },
  (error) => Promise.reject(error)
);
