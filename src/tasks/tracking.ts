import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { LOCATION_TASK } from "./locationTask";

export const startTracking = async (emergencyId: number) => {
  await SecureStore.setItemAsync("active_emergency_id", String(emergencyId));

  const running = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);

  if (running) return;

  await Location.startLocationUpdatesAsync(LOCATION_TASK, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 15,
    timeInterval: 10000,
    pausesUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Allerta emergency active",
      notificationBody:
        "Sharing your live location with your trusted contacts.",
      notificationColor: "#D91E2A",
    },
  });
};

export const stopTracking = async () => {
  await SecureStore.deleteItemAsync("active_emergency_id");

  const running = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
  if (running) await Location.stopLocationUpdatesAsync(LOCATION_TASK);
};
