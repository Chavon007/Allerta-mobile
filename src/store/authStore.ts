import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import apiClient from "@/service/api";
import { User } from "@/types/User";
import { unregisterPushToken } from "@/notifications/pushToken";
import { stopTracking } from "@/tasks/tracking";
interface AuthState {
  token: string | null;
  user: User | null;
  setUser: (user: User) => void;
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
    try {
      await SecureStore.setItemAsync("auth_token", token);
    } catch (e) {
      console.log("Failed to save auth token:", e);
    }
    set({ user, token, isLoggedIn: true });
  },
  setUser: (user) => set({ user }),
  logout: async () => {
    await unregisterPushToken();
    await stopTracking();
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
      const res = await apiClient.get("/auth/me");
      set({ user: res.data, isLoggedIn: true, isLoading: false });
    } catch {
      set({ token: null, user: null, isLoggedIn: false, isLoading: false });
    }
  },
}));
