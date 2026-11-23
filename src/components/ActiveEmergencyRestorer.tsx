
import { useEffect } from "react";
import { useGetUserAllEmergency } from "@/api/emergency";
import { useEmergencyState } from "@/store/emergencyStore";
import { stopTracking } from "@/tasks/tracking";

export default function ActiveEmergencyRestorer() {
  const emergencyId = useEmergencyState((e) => e.emergencyId);
  const setEmergencyId = useEmergencyState((e) => e.setEmergencyId);

  const { data: emergency } = useGetUserAllEmergency();

  useEffect(() => {
    if (!emergency) return;

    // Preserve an emergency ID supplied by a notification
    if (emergencyId !== null) return;

    const active = emergency.find((e) => e.status === "active");

    setEmergencyId(active ? active.id : null);

    if (!active) {
      stopTracking();
    }
  }, [emergency, emergencyId, setEmergencyId]);

  return null;
}
