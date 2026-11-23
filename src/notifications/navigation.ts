
import { router } from "expo-router";
import { useEmergencyState } from "@/store/emergencyStore";

export type PushData = {
  type?: string;
  emergency_id?: string;
};

export function openFromPush(data?: PushData) {
  if (!data?.type || !data.emergency_id) return;

  const emergencyId = Number(data.emergency_id);

  if (!Number.isSafeInteger(emergencyId) || emergencyId <= 0) {
    console.warn("Invalid emergency ID:", data.emergency_id);
    return;
  }

  // Emergency notification: open the received emergency
  if (data.type === "emergency") {
    router.push({
      pathname: "/seeAlert",
      params: { id: String(emergencyId) },
    });

    return;
  }

  // Response notification: save ID before navigation
  if (data.type === "response") {
    useEmergencyState.getState().setEmergencyId(emergencyId);

    router.push("/alertActive");
  }
}
