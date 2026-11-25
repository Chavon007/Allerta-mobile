import notifee from "@notifee/react-native";
import { getMessaging } from "@react-native-firebase/messaging";

getMessaging().setBackgroundMessageHandler(async () => {
  // System shows the notification itself; nothing else needed
});

notifee.onBackgroundEvent(async () => {});

import "expo-router/entry";
