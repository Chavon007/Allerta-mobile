import { Stack } from "expo-router";
import "./global.css";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import Toast from "react-native-toast-message";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { useAuthStore } from "@/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const hydrate = useAuthStore((state) => state.hydrate);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Manrope_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    hydrate();
  }, []);

  const ready = fontsLoaded && !isLoading;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </QueryClientProvider>
  );
}