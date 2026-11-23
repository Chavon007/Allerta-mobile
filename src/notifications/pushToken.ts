
import {
  getMessaging,
  getToken,
  onTokenRefresh,
  deleteToken,
} from "@react-native-firebase/messaging";

import { saveDeviceToken, deleteDeviceToken } from "@/api/deviceToken";
import { ensureNotificationPermission } from "@/hooks/useNotificationPermission";

export async function registerPushToken(): Promise<void> {
  try {
    const allowed = await ensureNotificationPermission();
    if (!allowed) return;

    const messagingInstance = getMessaging();
    const token = await getToken(messagingInstance);

    if (token) await saveDeviceToken(token);
  } catch (e) {
    console.log("push token error:", e);
  }
}

// Call once; returns the unsubscribe function
export function listenForTokenRefresh() {
  const messagingInstance = getMessaging();

  return onTokenRefresh(messagingInstance, async (newToken: string) => {
    try {
      await saveDeviceToken(newToken);
    } catch (e) {
      console.log("token refresh error:", e);
    }
  });
}

export const unregisterPushToken = async (): Promise<void> => {
  try {
    const messagingInstance = getMessaging();
    const token = await getToken(messagingInstance);

    if (token) await deleteDeviceToken(token);

    await deleteToken(messagingInstance);
  } catch (e) {
    console.log("unregister push token error:", e);
  }
};
