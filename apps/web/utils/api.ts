import axios, { AxiosError } from "axios";
import { getToken } from "./session";

export const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Example: auto-logout for expired sessions
    if (error.response?.status === 401) {
      console.log("Session expired");
      // Redirect or refresh token logic here
    }

    return Promise.reject(error);
  },
);
