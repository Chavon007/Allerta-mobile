import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import apiClient from "@/service/api";

export const LOCATION_TASK = "allerta-location-task";

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }: any) => {
  if (error) return;

  const id = await SecureStore.getItemAsync("active_emergency_id");
  if (!id) return;

  const locations: Location.LocationObject[] = data?.locations ?? [];
  const last = locations[locations.length - 1];
  if (!last) return;

  try {
    await apiClient.post(`/emergency/${id}/location`, {
      latitude: last.coords.latitude,
      longitude: last.coords.longitude,
    });
  } catch (e: any) {
    const code = e?.response?.status;
    if (code === 422 || code === 403 || code === 404) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);
      await SecureStore.deleteItemAsync("active_emergency_id");
    }
  }
});
