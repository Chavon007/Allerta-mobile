
import { Alert, PermissionsAndroid, Platform } from "react-native";
import {
  getMessaging,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";

export async function ensureNotificationPermission(): Promise<boolean> {
  // Android 12 and below: no runtime permission needed
  if (Platform.OS === "android" && Platform.Version < 33) return true;

  if (Platform.OS === "android") {
    const already = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (already) return true;

    // Explain why notification permission is needed
    await new Promise<void>((resolve) =>
      Alert.alert(
        "Allow notifications",
        "So you can be alerted when a contact needs help.",
        [{ text: "Continue", onPress: () => resolve() }],
        { cancelable: false },
      ),
    );

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  // iOS
  const status = await getMessaging().requestPermission();

  return (
    status === AuthorizationStatus.AUTHORIZED ||
    status === AuthorizationStatus.PROVISIONAL
  );
}
