import { Stack } from "expo-router";
import { startLocationWarmup } from "@/hooks/useLocation";
import "./global.css";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useRef } from "react";
import {
  registerPushListeners,
  handleInitialNotification,
} from "@/notifications/handlers";
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
import OfflineBanner from "@/components/OfflineBanner";
import PushTokenRegistrar from "@/components/PushTokenRegistrar";
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
    if (!ready || !token) return;

    const cleanup = registerPushListeners(() => {
      queryClient.invalidateQueries({ queryKey: ["receive-emeregency"] });
      queryClient.invalidateQueries({ queryKey: ["emergency"] });
      queryClient.invalidateQueries({ queryKey: ["my-emergency"] });
    });

    handleInitialNotification();

    return cleanup;
  }, [ready, token]);

  return (
    <QueryClientProvider client={queryClient}>
      {token && <ActiveEmergencyRestorer />}
      {token && <PushTokenRegistrar />}
      <OfflineBanner />
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
