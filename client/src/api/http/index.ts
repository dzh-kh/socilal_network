import { API_URL_BASE } from "@consts/paths";
import AuthResponse from "@models/AuthResponse";
import axios from "axios";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL_BASE,
});

$api.interceptors.request.use((config) => {
  config!.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL_BASE}/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        axios.request(originalRequest);
      } catch (e) {
        console.log("User is not authorized");
      }
    }
    throw error;
  }
);

export default $api;
