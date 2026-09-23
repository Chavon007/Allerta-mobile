import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import apiClient from "@/service/api";
import { User } from "@/types/User";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: true,

  login: async (user, token) => {
    await SecureStore.setItemAsync("auth_token", token);
    set({ user, token, isLoggedIn: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("auth_token");
    set({ user: null, token: null, isLoggedIn: false });
  },

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync("auth_token");
      if (!token) {
        set({ isLoading: false });
        return;
      }
      set({ token });
      const res = await apiClient.get("/me");
      set({ user: res.data, isLoggedIn: true, isLoading: false });
    } catch {
      set({ token: null, user: null, isLoggedIn: false, isLoading: false });
    }
  },
}));
