import { Stack } from "expo-router";
import { startLocationWarmup } from "@/hooks/useLocation";
import "./global.css";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { createEmergencyChannel } from "@/notifications/channel";
import Toast from "react-native-toast-message";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { useAuthStore } from "@/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ActiveEmergencyRestorer from "@/components/ActiveEmergencyRestorer";
import "@/tasks/locationTask";
import { ensureNotificationPermission } from "@/hooks/useNotificationPermission";
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

  useEffect(() => {
    createEmergencyChannel();
  }, []);
  useEffect(() => {
    if (!ready) return;

    const pending = startLocationWarmup();
    return () => {
      pending.then((sub) => sub?.remove());
    };
  }, [ready]);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;
    ensureNotificationPermission().then((ok) => {
      if (ok) {
      }
    });
  }, [token]);
  return (
    <QueryClientProvider client={queryClient}>
      {token && <ActiveEmergencyRestorer />}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 200,

          contentStyle: { backgroundColor: "#f5f8fb" },
        }}
      >
        <Stack.Screen
          name="countdown"
          options={{ contentStyle: { backgroundColor: "#FCE8E8" } }}
        />
        <Stack.Screen
          name="alertActive"
          options={{
            contentStyle: { backgroundColor: "#FCE8E8" },
            gestureEnabled: false,
          }}
        />
      </Stack>
      <Toast />
    </QueryClientProvider>
  );
}
