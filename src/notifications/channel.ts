import notifee, { AndroidImportance } from "@notifee/react-native";

export const EMERGENCY_CHANNEL_ID = "emergency";

export async function createEmergencyChannel() {
  await notifee.createChannel({
    id: EMERGENCY_CHANNEL_ID,
    name: "Emergency alerts",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
  });
}
