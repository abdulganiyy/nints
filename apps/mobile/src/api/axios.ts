import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("EXPO_PUBLIC_API_URL is not configured");
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const ACCESS_TOKEN_KEY = "nintpay_access_token";
const REFRESH_TOKEN_KEY = "nintpay_refresh_token";

export const tokenStorage = {
  getAccessToken: () =>
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY),

  getRefreshToken: () =>
    SecureStore.getItemAsync(REFRESH_TOKEN_KEY),

  saveTokens: async (
    accessToken: string,
    // refreshToken: string
  ) => {
    await Promise.all([
      SecureStore.setItemAsync(
        ACCESS_TOKEN_KEY,
        accessToken
      ),
    //   SecureStore.setItemAsync(
    //     REFRESH_TOKEN_KEY,
    //     refreshToken
    //   ),
    ]);
  },

  clearTokens: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    //   SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});