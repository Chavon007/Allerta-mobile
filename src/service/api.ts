import axios from "axios";
import * as SecureStore from "expo-secure-store";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;