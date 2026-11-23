
import {
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from "@react-native-firebase/messaging";

import notifee, { EventType } from "@notifee/react-native";

import { EMERGENCY_CHANNEL_ID } from "./channel";
import { openFromPush, PushData } from "./navigation";

// Show a notification banner while the app is open
export async function showForegroundNotification(remote: any) {
  await notifee.displayNotification({
    title: remote.notification?.title ?? "Allerta",
    body: remote.notification?.body ?? "",
    data: remote.data,
    android: {
      channelId: EMERGENCY_CHANNEL_ID,
      importance: 4,
      pressAction: {
        id: "default",
      },
    },
  });
}

// Register push notification listeners
export const registerPushListeners = (
  onForegroundPush: () => void
) => {
  const messaging = getMessaging();

  // App is open (foreground)
  const unsubMessage = onMessage(messaging, async (remote) => {
    await showForegroundNotification(remote);
    onForegroundPush();
  });

  // App is in background and user taps the notification
  const unsubOpened = onNotificationOpenedApp(
    messaging,
    (remote) => {
      openFromPush(remote.data as PushData);
    }
  );

  // User taps a notification displayed by Notifee
  const unsubNotifee = notifee.onForegroundEvent(
    ({ type, detail }) => {
      if (type === EventType.PRESS) {
        openFromPush(detail.notification?.data as PushData);
      }
    }
  );

  // Cleanup listeners
  return () => {
    unsubMessage();
    unsubOpened();
    unsubNotifee();
  };
};

// App was killed and opened by tapping a notification
export const handleInitialNotification = async () => {
  const remote = await getInitialNotification(getMessaging());

  if (remote) {
    openFromPush(remote.data as PushData);
  }
};
