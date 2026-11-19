import { useEffect } from "react";
import { useGetUserAllEmergency } from "@/api/emergency";
import { useEmergencyState } from "@/store/emergencyStore";
import { stopTracking } from "@/tasks/tracking";
export default function ActiveEmergencyRestorer() {
  const setEmergencyId = useEmergencyState((e) => e.setEmergencyId);
  const { data: emergency } = useGetUserAllEmergency();

  useEffect(() => {
    if (!emergency) return;
    const active = emergency.find((e) => e.status === "active");
    setEmergencyId(active ? active.id : null);
    if (!active) stopTracking();
  }, [emergency]);

  return null;
}
