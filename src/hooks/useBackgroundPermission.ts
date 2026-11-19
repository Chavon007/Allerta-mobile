import * as Location from "expo-location";

export async function ensureBackgroundPermission(): Promise<boolean> {
  const fg = await Location.requestForegroundPermissionsAsync();

  if (fg.status !== "granted") return false;

  const bg = await Location.requestBackgroundPermissionsAsync();

  return bg.status === "granted";
}
