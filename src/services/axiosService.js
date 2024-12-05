import axios from "axios";
import { getToken } from "../auth";

const BASE_URL = "http://localhost:9090";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to conditionally include the token
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    console.log("login token::: ", token);

    // Add Authorization header if token is available and requireAuth is true
    if (config.requireAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Remove the custom requireAuth property before making the request
    delete config.requireAuth;

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
