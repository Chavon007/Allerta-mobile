import { Stack } from "expo-router";
import "./global.css";

import { useFonts } from "expo-font";
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Manrope_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}